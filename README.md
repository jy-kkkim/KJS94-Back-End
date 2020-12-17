# KJS94
개발 기간 : 2020년 08월 01일 ~ 2020년 11월 10일

## [ About ]
비대면 체온측정 출입시스템과 딥러닝 기반 마스크 착용 확인 CCTV를 활용한 **코로나 바이러스 원천 차단 통합 관제 플랫폼**입니다.

**1. 비대면 체온측정 출입시스템**
- 코로나 바이러스 확산의 외부요소 차단
- 라즈베리파이에 초음파 센서, 적외선 체온측정 센서, 서보모터, 스피커로 구성
- 방문자의 체온을 측정하여 정상 체온일 경우 출입문을 개방하며 발열로 측정되면 DB와 관리자 페이지로 데이터 전송  
<br/>

**2. 딥러닝 기반 마스크 착용 확인 CCTV**
- 코로나 바이러스 확산의 내부요소 차단
- 라즈베리파이에 카메라, 스피커로 구성
- 내부 이용자의 마스크 미 착용이 탐지되면 스피커로 경고 메시지 출력
- 마스크 미 착용자 발생 시 관리자 페이지로 즉시 알림
<br/>

**3. 웹 관리자 페이지**
- 출입시스템, CCTV와 실시간 연동되어 관리자가 내·외부 환경을 관리하고 제어할 수 있는 환경 제공

## [ Preview ]
[<img src="https://img.youtube.com/vi/It-XZVLm0VE/maxresdefault.jpg" width="50%">](https://youtu.be/It-XZVLm0VE)

## [ Flow Chart ]
![flowchart](https://user-images.githubusercontent.com/53803882/102378352-0f451100-4009-11eb-80cd-c833f6d2a0eb.png)

## [ Develop Environment ]
#### FrontEnd
- Web : React.js

#### Server
- Web Server : Node.js(express)
- Message Queue : MQTT(paho, mosca)
- Database : MongoDB

#### IoT
- Device : Raspberry Pi(Python RPi.GPIO)
- AI : tensorflow MobileNet V2
