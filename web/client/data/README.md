# Static Data Overview

There are two data files needed for the application, which were supposed to be hosted on the CDN
at https://storage.staging.parkhands.com/ but this was shut down by the original team. The relevant files were 
located there at `static-spaces/20200918.json` and `static-slots/20200918.json` respectively and got downloaded into 
the local `./processed/` directory here during the Docker build.

The files we use now are generated from the [raw dataset](./raw/dataset_(09-16).json) we received from the developers, 
since the original files no longer exist, and are now stored as [`dataset.spaces.json`](./processed/dataset.spaces.
json) and [`dataset.slots.json`](./processed/dataset.slots.json) respectively.

# File Formats

The files are in standard JSON format and have to follow the layout described below:

## dataset.slots.json

The simplest possible ("empty") data set for this probably has to be:

```json
{
  "type": "FeatureCollection",
  "features": []
}
```

The document above should contain a list of feature objects looking similar to the following example (taken from the
provided sample data set, see the conversion section below):

```json
{
  "type": "Feature",
  "geometry": {
    "coordinates": [
      9.70322236418724,
      52.43191660584442
    ],
    "type": "Point"
  },
  "properties": {
    "id": "static-2-0-0",
    "booked": false,
    "inWorkingHours": false,
    "inAmenities": false,
    "status": "DISABLED",
    "parkingSpaceId": null,
    "location": {
      "longitude": 9.70322236418724,
      "latitude": 52.43191660584442
    },
    "static": true,
    "staticSpaceId": "static-2",
    "shape": {
      "coordinates": [
        [
          [
            9.703246504068375,
            52.43189616414078
          ],
          [
            9.703203588724136,
            52.43189371113635
          ],
          [
            9.703198224306107,
            52.43193704754805
          ],
          [
            9.703241139650345,
            52.43193950055248
          ],
          [
            9.703246504068375,
            52.43189616414078
          ]
        ]
      ],
      "type": "Polygon"
    }
  }
}
```

## dataset.spaces.json

The simplest possible ("empty") data set for this probably has to be:

```json
{
  "spaces": []
}
```

The document above should contain a list of space objects looking similar to the following example (taken from the
provided sample data set, see the conversion section below):

```json
{
  "id": "static-1",
  "static": true,
  "name": "Unclaimed space",
  "staticId": 1,
  "photoUrl": null,
  "slotsCount": 0
}
```

# Conversion from dataset.json

The former development team could provide us with [a raw dataset file](dataset_(09-16).json), that can be converted into
the two required formats outlined above using the [dataset-transformer](/organic/cells/dataset-transformer) service.

## Instructions

Operate in the project root directory. It is expected that you have already initialized your local development
environment (see the main [README](/README.md) for instructions).

Make sure your local `.env` file is populated with useful values, based on [.env.example](/.env.example). It's probably
okay to just leave the defaults.

Then, start up the backend services locally, including the organic services, MinIO storage and PostgreSQL database:

```bash
npm run-script stack-up
```

Open [the local MinIO dashboard](http://localhost:9000) in your browser. You can log in using the `MINIO_ACCESS_KEY`
and `MINIO_SECRET_KEY` from your `.env` file. Navigate to the `dataset` bucket using the left sidebar and upload the raw
dataset JSON file into it.

The `dataset-transformer` service should automatically notice the event and initiate a conversion, storing the resulting
JSON files with the same name as your upload into the `static-slots` and `static-spaces` storage buckets respectively,
from where you can download them.

You may now shut down the software stack again:

```bash
npm run-script stack-down
```
