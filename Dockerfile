FROM iojs:2.0.2

MAINTAINER Jonas Schneider <jonas.schneider@balcab.ch>

# Create the folder app
RUN mkdir /app

# install Sails
RUN npm install -g sails@0.12.0
RUN npm install grunt

# Copy the app in the folder
COPY . /app

VOLUME ["/app"]

WORKDIR /app

EXPOSE 1337
EXPOSE 80
EXPOSE 447
