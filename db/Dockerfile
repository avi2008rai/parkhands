FROM bitnami/postgresql-repmgr:11.7.0-debian-10-r104 AS builder

USER 0
#add diconium-CA.pem to ca-certificates accepted by the container
COPY ./diconium-CA.pem /diconium-CA.pem
RUN cat /diconium-CA.pem >> /etc/ssl/cert.pem

# Create postgres user
RUN useradd postgres

# Pull fresh repo list
RUN apt-get clean && \
    apt-get update -y && \
    apt-get upgrade -y && \
    apt-get autoremove -y && apt-get clean

# Build and tools packages.
RUN apt-get install -y git \
                       make \
                       cmake \
                       build-essential \
                       libssl-dev

# Clean APT
RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install pg_partman
ENV PG_PARTMAN_VERSION v4.3.0
RUN git clone --depth 1 https://github.com/pgpartman/pg_partman.git -b $PG_PARTMAN_VERSION \
    && cd pg_partman \
    && make NO_BGW=1 install && cd ../ && rm -rf pg_partman

# Install pg_cron
ENV PG_CRON_VERSION v1.2.0
RUN git clone --depth 1 https://github.com/citusdata/pg_cron.git -b $PG_CRON_VERSION \
    && cd pg_cron \
    && PATH=$PATH make install && cd ../ && rm -rf pg_cron

# Install pgtap
ENV PGTAP_VERSION v1.1.0
RUN git clone --depth 1 https://github.com/theory/pgtap.git -b $PGTAP_VERSION \
    && cd pgtap \
    && make && make install && cd ../ && rm -rf pgtap

# Install pg_hashids
ENV PG_HASHIDS_VERSION v1.2.1
RUN git clone --depth 1 git://github.com/iCyberon/pg_hashids.git -b $PG_HASHIDS_VERSION \
    && cd pg_hashids \
    && make && make install && cd ../ && rm -rf pg_hashids

# Install Timescaledb
ENV TIMESCALEDB_VERSION 1.6.0
RUN git clone --depth 1 git://github.com/timescale/timescaledb.git -b $TIMESCALEDB_VERSION \
    && cd timescaledb \
    && ./bootstrap -DREGRESS_CHECKS=OFF && cd build && make && make install && cd ../../ && rm -rf timescaledb

# Install pgjwt
ENV PGJWT_VERSION master
RUN git clone --depth 1 git://github.com/michelp/pgjwt.git -b $PGJWT_VERSION \
    && cd pgjwt \
    && make && make install && cd ../ && rm -rf pgjwt

USER 1001
