import re
def alphabet_position(text):
    plain_txt = re.findall('[a-z]',text.lower())
    string = list()
    for x in plain_txt: string.append(str(ord(x)-96))
    return ' '.join(string)
print(alphabet_position("The sunset sets at twelve o' clock."))
