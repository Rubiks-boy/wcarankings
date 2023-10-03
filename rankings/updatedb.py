import pandas as pd
import requests
import os
import re
from zipfile import ZipFile

from .models import SingleRank, AverageRank

BATCH_SIZE = 1000
EXPORT_URL = "https://www.worldcubeassociation.org/export/results/WCA_export.tsv.zip"
ZIP_FNAME = "./export.zip"
TMP_DIR = "./tmp"


def download_export():
    zip_file = requests.get(EXPORT_URL)
    open(ZIP_FNAME, "wb").write(zip_file.content)


def unzip_export():
    with ZipFile(ZIP_FNAME, "r") as zip_ref:
        zip_ref.extractall(TMP_DIR)


def import_tsv(filename: str, type: str):
    tsv = pd.read_csv(filename, sep="\t", low_memory=False)

    Rank = SingleRank if type == "SingleRank" else AverageRank

    Rank.objects.all().delete()

    ranks = []
    i = 0

    for [_, r] in tsv.iterrows():
        if len(ranks) >= BATCH_SIZE:
            Rank.objects.bulk_create(ranks)
            ranks = []
            print("Bulk create", i)

        rank = Rank(
            personId=r.personId,
            eventId=r.eventId,
            best=r.best,
            worldRank=r.worldRank,
            continentRank=r.continentRank,
            countryRank=r.countryRank,
        )
        ranks.append(rank)
        i += 1

    Rank.objects.bulk_create(ranks)

    print("Finished update.", filename, type)


def cleanup_tmp_files():
    if os.path.isfile(ZIP_FNAME):
        os.remove(ZIP_FNAME)

    if os.path.exists(TMP_DIR):
        for f in os.listdir(TMP_DIR):
            if (
                f != "metadata.json"
                and f != "README.md"
                and not re.match(r"WCA_export_.*\.tsv", f)
            ):
                raise Exception("Unknown file in temp dir", f)

            os.remove(f"{TMP_DIR}/{f}")

        os.rmdir(TMP_DIR)


def perform_update(type: str):
    print("Beginning update...", type)

    print("Cleaning up existing files...")
    cleanup_tmp_files()

    print("Downloading results export...")
    download_export()

    print("Upzipping results export...")
    unzip_export()

    print("Wiping db and importing new rankings...")
    tsv_name = (
        "WCA_export_RanksSingle" if type == "SingleRank" else "WCA_export_RanksAverage"
    )
    import_tsv(f"{TMP_DIR}/{tsv_name}.tsv", type)

    print("Cleaning up...")
    cleanup_tmp_files()

    print("Update complete.", type)


def update_all():
    perform_update("SingleRank")
    perform_update("AverageRank")
