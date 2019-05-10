#! /bin/bash -

file=${1}
from=${2}
to=${3}

sed -ie "s%${from}%${to}%g" ${file}
sed -ie "s%${from^^}%${to^^}%g" ${file}
sed -ie "s%${from,,}%${to,,}%g" ${file}

rm ${file}e
