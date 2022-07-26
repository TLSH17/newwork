# Internet

host <> NAT <> Server

當 host 提供資料給 server 時，host 先與 nat 溝通，然後 nat 再與 server 溝通；當 server 回應 host 時，先與 nat 溝通，再由 nat 與 host 溝通。

host 類似於劏房，而 nat 就像劏房對外門戶地址，外界不知道地址內有多少個 host。
此種做法好處是基於 ipv4 [0-255][0-255][0-255][0-255] 所組合的 ip 地址組合下有更多 ip 利用

網站類似於酒店

| Name                 | IP             | Port        |
| -------------------- | -------------- | ----------- |
| 網站：www.google.com | 168.xxx.xxx.xx | Port:80     |
| 酒店：半島酒店       | 尖沙咀 xxxxxx  | Room number |

即使知道酒店名（網站名）但不代表知道如果前往該地址（ip）

## DNS lookup

當我們輸入網路名時，背後會進行一個 DNS lookup 將其轉換成 ip 地址，以前往該 server 取得資料。

nameServer <> client <> Server

當 client 輸入網站時，向 nameServer 請求 server 地址，nameServer 會回應 ServerIP 給 client，然後 client 再前往 serverIP

## TCP / UDP

| TCP                                                    | UDP                                 |
| ------------------------------------------------------ | ----------------------------------- |
| Establish and maintain a connection on transfer        | UDP is connectionless               |
| Guarantee delivery of the packet, will retry if failed | no guarantee delivery of the packet |
| Need more processing power                             | Need less processing power          |
| HTTP / SMTP(email)                                     | VOIP,online game and DNS lookup     |

HTTP 是利用 tcp 的 higher level, 比較接近 user，而 tcp 是 lower level。

## HTTP

HTTP Request:
sent from the HTTP Client Browser to HTTP Server, is made by your browser.

HTTP Response:
package of information is responded from the HTTP Server to HTTP client(Browser) to respond to an incoming HTTP Request.

HTTP Client:
User

HTTP Server:
Server holder
