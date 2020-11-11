import re
def printer_error(s):
    length = len(s)
    m = re.search('[a-m]*',s).group(0)
    print(m)

printer_error('aawwaaaaabdfhzzz')