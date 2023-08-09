FROM grafana/grafana:6.7.3
#TODO update grafana version
USER 0
COPY ./diconium-CA.pem /
RUN cat /diconium-CA.pem >> /etc/ssl/certs/ca-certificates.crt

USER grafana
