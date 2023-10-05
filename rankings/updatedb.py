import pandas as pd
import requests
import os
import re
from zipfile import ZipFile

from .models import SingleRank, AverageRank, Person

BATCH_SIZE = 10000
EXPORT_URL = "https://www.worldcubeassociation.org/export/results/WCA_export.tsv.zip"
ZIP_FNAME = "./export.zip"
TMP_DIR = "./tmp"


def download_export():
    zip_file = requests.get(EXPORT_URL)
    open(ZIP_FNAME, "wb").write(zip_file.content)


def unzip_export():
    with ZipFile(ZIP_FNAME, "r") as zip_ref:
        zip_ref.extractall(TMP_DIR)


def delete_the_world():
    SingleRank.objects.all().delete()
    AverageRank.objects.all().delete()
    Person.objects.all().delete()


def import_persons(filename: str):
    tsv = pd.read_csv(
        filename,
        sep="\t",
        low_memory=False,
        # "name" gives the row index :/ rename it to "full_name"
        names=["subid", "full_name", "countryId", "gender", "id"],
        header=0,
    )

    persons = []
    i = 0

    for [_, p] in tsv.iterrows():
        if len(persons) >= BATCH_SIZE:
            Person.objects.bulk_create(persons)
            persons = []
            print("Bulk create", i)

        if p.subid > 1:
            continue

        person = Person(
            id=p.id, name=p.full_name, countryId=p.countryId, gender=p.gender
        )
        persons.append(person)
        i += 1

    Person.objects.bulk_create(persons)

    print("Finished update.", filename, "Person")


def import_rank_tsv(filename: str, type: str):
    tsv = pd.read_csv(filename, sep="\t", low_memory=False)

    Rank = SingleRank if type == "SingleRank" else AverageRank

    ranks = []
    i = 0

    for [_, r] in tsv.iterrows():
        if len(ranks) >= BATCH_SIZE:
            Rank.objects.bulk_create(ranks)
            ranks = []
            print("Bulk create", i)

        rank = Rank(
            person_id=r.personId,
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


def update_all():
    print("Beginning update...")

    print("Cleaning up existing files...")
    cleanup_tmp_files()

    print("Downloading results export...")
    download_export()

    print("Upzipping results export...")
    unzip_export()

    print("Wiping db...")
    delete_the_world()

    print("Importing new persons...")
    import_persons(f"{TMP_DIR}/WCA_export_Persons.tsv")

    print("Importing new single rankings...")
    import_rank_tsv(f"{TMP_DIR}/WCA_export_RanksSingle.tsv", "SingleRank")

    print("Importing new average rankings...")
    import_rank_tsv(f"{TMP_DIR}/WCA_export_RanksAverage.tsv", "AverageRank")

    print("Cleaning up...")
    cleanup_tmp_files()

    print("Update complete.")
