locals {
  name = "app-lobsome"
  gcp_region = "europe-west6"
}

provider "google" {
  project = "mumble-389511"
  region = local.gcp_region
}

data "google_project" "project" {
}

provider "random" {
}

terraform {
  backend "gcs" {
    bucket = "app-lobsome-tf-state"
  }
}