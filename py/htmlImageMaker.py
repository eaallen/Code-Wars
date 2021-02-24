from PIL import Image

def testImg():
    im = Image.open('img.png') # Can be many different formats.
    rgb_im = im.convert('RGB')
    # pix = im.load()
    pix = rgb_im.load()
    print(im.size)  # Get the width and hight of the image for iterating over

    # r, g, b = rgb_im.getpixel((1, 1))
    arr_of_px = []
    for y in range(int(im.size[1])):
        row = []
        for x in range(int(im.size[0])):
            r,g,b = pix[x,y]
            # print()  # Get the RGBA Value of the a pixel of an image
            row.append(rgb2hex(r,g,b))

        arr_of_px.append(row)
    return arr_of_px

def rgb2hex(r, g, b):
    return '#{:02x}{:02x}{:02x}'.format(r, g, b)

def creatHtmlTable(arr):
    table = '<table>'
    for row in arr:
        table += '<tr>'
        for color in row:
            table += '<td style=" width:0.2px; height:0.2px; background-color:'+ color +'"></td>'
        table += '</tr>'
    table += '</table>'
    return table

def createHTML(html):
    head = '''
    <!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Image creater test</title>
        <style>
            table {
                border-collapse: collapse;
            }
        </style>
    </head>

    <body>
    '''
    head += html
    head += '</body>'
    return head

arr = testImg()
html_table = creatHtmlTable(arr)
html = createHTML(html_table)

Html_file= open("output.html","w")
Html_file.write(html)
Html_file.close()