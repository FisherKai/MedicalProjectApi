#!/usr/bin/python3
#coding=utf-8
import urllib.request

def getHtml(url):
    headers ={
        'cookie':'MUID=194FCF6F2BEE6FF00808DF732AAD6E17',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36'
    }
    req = urllib.request.Request(url=url, headers=headers)
    content = urllib.request.urlopen(req).read().decode('utf-8')
    return content

html = getHtml("https://db.yaozh.com/pijian/ZpSXbGRkNTEzZTQ=.html")

print(html)
