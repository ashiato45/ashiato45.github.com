import glob
import os.path
import codecs
import xml.etree.ElementTree as ET
import urllib

def open_read(f_):
    f = codecs.open(f_, "r", "shift_jis")
    res = f.read()
    f.close()
    return res

sidebar = open_read("./template/sidebar.html")
template = open_read("./template/template.html")


def lineprint(s):
    sp = s.split("\n")
    for i in range(len(sp)):
        print(i+1, sp[i])

for cfile in glob.glob("contents/*.html"):
    # print(sidebar)
    sidedoc = ET.fromstring(sidebar.encode("utf_8"))
    for a in sidedoc.iter("a"):
        if os.path.basename(cfile) in a.attrib["href"]:
            titlename = a.text
            break

    print(cfile)
    content = open_read(cfile)
    page = template.replace("%CONTENT%", content)
    page = page.replace("%SIDEBAR%", ET.tostring(sidedoc).decode())
    address = "http://ashiato45.github.io/"
    page = page.replace("%HOME%", ".")
    if "index.html" in cfile:
        page = page.replace("%CURRENT%", address)
        # page = page.replace("%CURRENT_FACEBOOK%", urllib.quote(address, ""))
    else:
        page = page.replace("%CURRENT%", address + os.path.basename(cfile))
        # page = page.replace("%CURRENT_FACEBOOK%", urllib.quote(address + os.path.basename(cfile), ""))

    lineprint(page)

    doc = ET.fromstring(page)
    tree = ET.ElementTree()
    tree._setroot(doc)

    if not "index.html" in cfile:
        [x for x in tree.iterfind("head/title")][0].text += ">" + titlename



    for li in tree.iterfind("body/div/div/div/div/ul/li"):
        inli = [x for x in li.iterfind("a")]
        print(inli)
        if inli != [] and os.path.basename(cfile) in inli[0].attrib["href"]:
            print("yes")
            li.attrib["class"] = "active"

    tree.write(os.path.join("../", os.path.basename(cfile)), "utf_8")
