# News Aggregator

## Overview

This repository contains a React application for aggregating news, containerized using Docker. This setup ensures consistency across different environments and simplifies deployment.

## Docker Setup Instructions

### Prerequisites

- Docker should be installed on your machine. If not, follow the [Docker installation guide](https://docs.docker.com/get-docker/).

### Pulling the Docker Image

1. **Pull the Docker Image**

   To get the latest version of the application, run the following command:
   docker pull sohaib57/news-aggregator:latest


### Running the Docker Image

1. **Run the Docker Image**

docker run -d -p 8080:80 sohaib57/news-aggregator:latest
