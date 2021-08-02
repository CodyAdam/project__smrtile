import sys
import os
import re

suffix = '''
  );
}'''

if len(sys.argv) <= 1:
    path = '\\'.join(os.path.realpath(__file__).split("\\")[:-1])
else:
    path = sys.argv[1]

if not os.path.isdir(path):
    print('this directory path does not exist : ' + path)
    exit(1)
if not path[-1:] == "\\":
    path = path + '\\'


def filterSvg(string):
    svgRegex = re.compile(r'(.*)(.svg)$')
    return True if svgRegex.fullmatch(string) else False


def properName(string):
    substr = re.split(r' |\.|-|_', string)
    res = ''
    for word in substr:
        res = res + toPascalCase(word)
    return res


def toPascalCase(s):
    return s[:1].upper() + s[1:].lower()


filenames = next(os.walk(path), (None, None, []))[2]
filenames = list(filter(filterSvg, filenames))

for filename in filenames:
    name = filename[:-4]
    prefix = '''export default function ''' + properName(
        name) + '''({ className = '' }: { className?: string }) {
  return (
    '''
    new_filename = properName(name) + '.tsx'
    if os.path.isfile(path + new_filename):
        print(filename + "    -->    " + new_filename + "   (overrited)")
        os.remove(path + new_filename)
    else:
        print(filename + "    -->    " + new_filename)
    svgContent = open(path + filename, "r").read()

    svgContent = svgContent[:4] + ' className={className}' + svgContent[4:]

    new_file = open(path + new_filename, "w")
    new_file.write(prefix + svgContent + suffix)
    os.remove(path + filename)

print(f'Done! (number of files transformed : {len(filenames)})')