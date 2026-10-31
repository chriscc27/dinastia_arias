#!/bin/sh
# Descarga Weka 3.8.6 (University of Waikato) y sus dependencias de ejecución desde Maven Central.
# Lo usan el Dockerfile de la API y cualquier PC que quiera correr los análisis en local.
# Uso: sh weka/download-weka.sh   (desde la carpeta qa-hub)
set -e
DIR="$(cd "$(dirname "$0")" && pwd)/lib"
mkdir -p "$DIR"
M=https://repo1.maven.org/maven2
for ruta in \
  nz/ac/waikato/cms/weka/weka-stable/3.8.6/weka-stable-3.8.6.jar \
  nz/ac/waikato/cms/weka/thirdparty/bounce/0.18/bounce-0.18.jar \
  com/github/vbmacher/java-cup-runtime/11b-20160615/java-cup-runtime-11b-20160615.jar \
  org/apache/commons/commons-compress/1.21/commons-compress-1.21.jar \
  com/googlecode/matrix-toolkits-java/mtj/1.0.4/mtj-1.0.4.jar \
  net/sourceforge/f2j/arpack_combined_all/0.1/arpack_combined_all-0.1.jar \
  com/googlecode/netlib-java/netlib-java/1.1/netlib-java-1.1.jar
do
  archivo="$DIR/$(basename "$ruta")"
  [ -f "$archivo" ] || curl -sfL -o "$archivo" "$M/$ruta"
done
echo "Weka listo en $DIR"
