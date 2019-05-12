import os
import subprocess
import sys
for file in os.listdir(sys.argv[1]):
    if file.endswith('Reducer.ts'):
        to = file[:-len('Reducer.ts')].split(os.path.sep)[-1]
        print(to)
        to = ''.join([to[0].capitalize(), to[1:]])
        subprocess.call(['bash', 'rename.sh', file, 'JobGrade', to])