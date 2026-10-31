# Imagen de la QA Hub API: Node 20 + Java 17 (para ejecutar Weka 3.8.6)
FROM node:20-bookworm-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends openjdk-17-jre-headless curl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY weka/download-weka.sh /opt/weka/download-weka.sh
RUN sh /opt/weka/download-weka.sh

WORKDIR /app
COPY api/package.json ./
COPY api/server.js ./
COPY api/lib ./lib

ENV NODE_ENV=production
EXPOSE 8787
HEALTHCHECK --interval=30s --timeout=5s CMD curl -fs http://localhost:8787/api/health || exit 1
CMD ["node", "server.js"]
