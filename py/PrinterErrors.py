import re
def printer_error(s):
    length = len(s)
    err = len(re.findall('[n-z]',s))
    return str(err)+'/'+str(length)

print(printer_error('aawwaaaaabdfhzzz'))