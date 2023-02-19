DROP TABLE IF EXISTS `Movie_infoseat`;
DROP TABLE IF EXISTS `Movie_seat`;
DROP TABLE IF EXISTS `Movie_reservation`;
DROP TABLE IF EXISTS `Movie_information`;
DROP TABLE IF EXISTS `Movie_cinema`;
DROP TABLE IF EXISTS `Comment_Info`;
DROP TABLE IF EXISTS `Movie_member`;
DROP TABLE IF EXISTS `Movie_actor`;
DROP TABLE IF EXISTS `Actor`;
DROP TABLE IF EXISTS `Movie_theater`;
DROP TABLE IF EXISTS `Member`;
DROP TABLE IF EXISTS `Movie`;
DROP PROCEDURE IF EXISTS clone_member;
DROP PROCEDURE IF EXISTS clone_member_like1;
DROP PROCEDURE IF EXISTS clone_member_like2;
DROP PROCEDURE IF EXISTS clone_member_like3;
DROP PROCEDURE IF EXISTS clone_member_like4;
DROP PROCEDURE IF EXISTS clone_member_like5;

CREATE TABLE `Member` (
	`uid`	varchar(20)	NOT NULL,
	`upw`	varchar(255) NOT NULL,
	`uname`	varchar(15)	NOT NULL,
	`uemail` varchar(50) NOT NULL,
	`utel`	varchar(15)	NOT NULL,
	`uaddr`	varchar(50)	NOT NULL,
	`ubirth`	date	NOT NULL,
	`uauthority` VARCHAR(20) NOT NULL,
	PRIMARY KEY (`uid`)
);

CREATE TABLE `Movie` (
	`mid`	int AUTO_INCREMENT NOT NULL,
	`mtitle`	varchar(30)	NULL,
	`mdir`	VARCHAR(20)	NULL,
	`mgenre`	varchar(15)	NULL,
	`mtime`	int	NULL,
	`mdate`	date	NULL,
	`mrating`	varchar(15)	NULL,
	`mstory`	VARCHAR(2000)	NULL,
	`mimagepath` VARCHAR(50) NULL,
	PRIMARY KEY (`mid`)
);

CREATE TABLE `Movie_theater` (
	`tid`	INT AUTO_INCREMENT NOT NULL,
	`tname`	varchar(30)	NULL,
	`tarea`	varchar(30)	NULL,
	`taddr`	varchar(50)	NULL,
	PRIMARY KEY (`tid`)
);

CREATE TABLE `Actor` (
	`aid` INT AUTO_INCREMENT NOT NULL,
	`aname` VARCHAR(20) NULL,
	`abirthplace` VARCHAR(20) NULL,
	PRIMARY KEY (`aid`)
);

CREATE TABLE `Movie_actor` (
	`maid` INT  AUTO_INCREMENT NOT NULL,
	`marole` VARCHAR(10) NULL,
	`aid` INT NOT NULL,
	`mid` INT NOT NULL,
	PRIMARY KEY (`maid`),
	FOREIGN KEY (`aid`) REFERENCES `Actor` (`aid`),
	FOREIGN KEY (`mid`) REFERENCES `Movie` (`mid`)
);

CREATE TABLE `Movie_member` (
	`umid`	INT	NOT NULL AUTO_INCREMENT,
	`umlike`	BOOLEAN 	NULL,
	`umscore`	INT 	NULL,
	`umcomment`	VARCHAR(200) NULL,
	`umcommenttime` DATE NULL,
	`mid` INT NOT NULL,
	`uid` VARCHAR(20) NOT NULL,
	PRIMARY KEY (`umid`),
	FOREIGN KEY (`mid`) REFERENCES `Movie` (`mid`),
	FOREIGN KEY (`uid`) REFERENCES `Member` (`uid`)
);

CREATE TABLE `Comment_Info` (
	`cuid` INT NOT NULL AUTO_INCREMENT,
	`uid`	varchar(20)	NOT NULL,
	`umid`	INT	NOT NULL,
	FOREIGN KEY (`uid`) REFERENCES `Member` (`uid`),
	FOREIGN KEY (`umid`) REFERENCES `Movie_member` (`umid`),
	PRIMARY KEY (`cuid`)
);

CREATE TABLE `Movie_cinema` (
	`cid`	INT AUTO_INCREMENT NOT NULL,
	`cname`	varchar(20)	NULL,
	`ctype`	varchar(10)	NULL,
	`cseat`	INT	NULL,
	`tid`	INT	NOT NULL,
	PRIMARY KEY (`cid`),
	FOREIGN KEY (`tid`) REFERENCES `Movie_theater` (`tid`)
);

CREATE TABLE `Movie_information` (
	`miid`	INT NOT NULL AUTO_INCREMENT,
	`miday`	DATE NULL,
	`mistarttime`	time	NULL,
	`miendtime`	time NULL,
	`mid`	INT	NOT NULL,
	`cid` INT NOT NULL,
	PRIMARY KEY (`miid`),
	FOREIGN KEY (`mid`) REFERENCES `Movie` (`mid`),
	FOREIGN KEY (`cid`) REFERENCES `Movie_cinema` (`cid`)

);

CREATE TABLE `Movie_reservation` (
	`rid`	INT AUTO_INCREMENT NOT NULL,
	`rdate`	date	NULL,
	`rprice`	int	NULL,
	`miid`	int	NOT NULL,
	`uid`	varchar(20)	NOT NULL,
	PRIMARY KEY (`rid`),
	FOREIGN KEY (`miid`) REFERENCES `Movie_information` (`miid`),
	FOREIGN KEY (`uid`) REFERENCES `Member` (`uid`)
);

CREATE TABLE `Movie_seat` (
	`sid`	INT AUTO_INCREMENT NOT NULL,
	`sname`	varchar(20)	NULL,
	`cid`	INT	NOT NULL,
	PRIMARY KEY (`sid`),
	FOREIGN KEY (`cid`) REFERENCES `Movie_cinema` (`cid`)
);

CREATE TABLE `Movie_infoseat` (
	`misid` INT AUTO_INCREMENT NOT NULL,
	`sid` INT  NOT NULL,
	`miid` INT  NOT NULL,
	 PRIMARY KEY (`misid`),
	 FOREIGN KEY (`sid`) REFERENCES `Movie_seat` (`sid`),
    FOREIGN KEY (`miid`) REFERENCES `Movie_information` (`miid`)
);

INSERT INTO `movie` (`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES ('타이타닉', '제임스 카메론', '로맨스', 195, '2023-02-08', '15', '<h2><span style="color: rgb(51, 51, 51);">"내 인생의 가장 큰 행운은 당신을 만난 거야"</span></h2><p><br></p><p><span style="color: rgb(51, 51, 51);">우연한 기회로 티켓을 구해 타이타닉호에 올라탄 자유로운 영혼을 가진 화가 ‘잭’(레오나르도 디카프리오)은</span></p><p><span style="color: rgb(51, 51, 51);">막강한 재력의 약혼자와 함께 1등실에 승선한 ‘로즈’(케이트 윈슬렛)에게 한눈에 반한다.</span></p><p><span style="color: rgb(51, 51, 51);">진실한 사랑을 꿈꾸던 ‘로즈’ 또한 생애 처음 황홀한 감정에 휩싸이고, 둘은 운명 같은 사랑에 빠지는데…</span></p><p><br></p><p><span style="color: rgb(51, 51, 51);">가장 차가운 곳에서 피어난 뜨거운 사랑!</span></p><p><span style="color: rgb(51, 51, 51);">영원히 가라앉지 않는 세기의 사랑이 펼쳐진다!</span></p>', 'img/ranking/5.jpg');

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('레오나르도 디카프리오', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('케이트 윈슬렛', '영국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('빌리 제인', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('캐시 베이츠', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('빌 팩스톤', '미국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '1', '1');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '2', '1');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '3', '1');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '4', '1');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '5', '1');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("카운트", "권혁재" , "드라마", "109", "20230212", "12", '<h2><span style="color: rgb(68, 68, 68);">마이웨이, 오직 직진!</span></h2><p><span style="color: rgb(68, 68, 68);">한번 물면 절대 놓지 않는 킹받는 美친 개가 온다!</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">1988년 올림픽 금메달리스트지만</span></p><p><span style="color: rgb(68, 68, 68);">1998년 지금은 평범한 고등학교 선생인 ‘시헌’(진선규).</span></p><p><span style="color: rgb(68, 68, 68);">선수 생활 은퇴 후 남은 건 고집뿐,</span></p><p><span style="color: rgb(68, 68, 68);">모두를 킹받게 하는 마이웨이 행보로 주변 사람들의 속을 썩인다.</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">그러던 어느 날, 우연히 참석한 대회에서 뛰어난 실력에도 불구하고</span></p><p><span style="color: rgb(68, 68, 68);">승부 조작으로 기권패를 당한 ‘윤우’(성유빈)를 알게 된 ‘시헌’은</span></p><p><span style="color: rgb(68, 68, 68);">복싱부를 만들기로 결심한다.</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">아내 ‘일선’(오나라)의 열렬한 반대와, ‘교장’(고창석)의 끈질긴 만류도 무시한 채,</span></p><p><span style="color: rgb(68, 68, 68);">‘시헌’은 독기만 남은 유망주 ‘윤우’와</span></p><p><span style="color: rgb(68, 68, 68);">영문도 모른 채 레이더망에 걸린 ‘환주’(장동주), ‘복안’(김민호)을 데리고</span></p><p><span style="color: rgb(68, 68, 68);">본격적인 훈련에 돌입하기 시작하는데...!</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">쓰리, 투, 원! 2023년 새해, 긍정 파워 풀충전!</span></p><p><span style="color: rgb(68, 68, 68);">그들만의 가장 유쾌한 카운트가 시작된다</span></p>', "img/ranking/6.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('진선규', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('성유빈', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('오나라', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('고창석', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('장동주', '한국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '6', '2');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '7', '2');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '8', '2');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '9', '2');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '10', '2');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("상견니", "황천인" , "드라마", "107", "20230125", "15", '<h2><span style="color: rgb(68, 68, 68);">드라마의 스토리를 영화 버전으로 확장시킨</span></h2><p><span style="color: rgb(68, 68, 68);">멀티버스 판타지 로맨스</span></p><p><span style="color: rgb(68, 68, 68);">완전히 새로운 세계관, 완전히 새로운 스토리의 &lt;상견니&gt;</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">2009년,</span></p><p><span style="color: rgb(68, 68, 68);">리쯔웨이와 황위쉬안은 밀크티 가게에서 우연히 재회한다.</span></p><p><span style="color: rgb(68, 68, 68);">처음 만났지만 마치 오래전부터 알고 있었던 것 같은 기시감과</span></p><p><span style="color: rgb(68, 68, 68);">묘한 설렘을 느끼는 두 사람.</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">이들은 사계절을 함께 보내며 가까워지고,</span></p><p><span style="color: rgb(68, 68, 68);">2010년의 마지막 날, 함께 새해를 맞이하며 연인이 된다.</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">2017년,</span></p><p><span style="color: rgb(68, 68, 68);">황위쉬안의 인생에 예상치 못한 변화가 생긴다. 해외 발령을 받게 된 것.</span></p><p><span style="color: rgb(68, 68, 68);">황위쉬안은 이 제안을 받아들이고 새로운 여정을 시작하지만</span></p><p><span style="color: rgb(68, 68, 68);">이 선택은 그녀의 미래를 바꿀 뿐만 아니라,</span></p><p><span style="color: rgb(68, 68, 68);">리쯔웨이와 모쥔제, 그리고 그녀가 아직 모르는 천윈루의 운명까지 뒤바꿔 놓는데…</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">이제, 이들은 수없이 뒤엉킨 타임라인 속에서 서로를 구하기 위해</span></p><p><span style="color: rgb(68, 68, 68);">낡은 테이프 속 들려오는 노래 ‘라스트 댄스’를 따라 달려가기 시작한다.</span></p>',"img/ranking/8.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('가가연', '대만');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('허광한', '대만');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('시백우', '대만');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '11', '3');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '12', '3');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '13', '3');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("젠틀맨", "김경원" , "범죄", "123", "20221228", "15", '<h2><span style="color: rgb(51, 51, 51);">“지금 제가 검사인 상황…인 거죠?”</span></h2><p><br></p><p><span style="color: rgb(51, 51, 51);">의뢰받은 사건은 100% 처리하는 흥신소 사장 ‘지현수’.</span></p><p><span style="color: rgb(51, 51, 51);">의뢰인과 함께 강아지를 찾기 위해 간 어느 펜션에서 괴한의 습격을 받고 쓰러진다.</span></p><p><span style="color: rgb(51, 51, 51);">끊어진 기억, 사라진 의뢰인. 정신을 차려보니 졸지에 납치 사건 용의자로 몰려버렸다.</span></p><p><span style="color: rgb(51, 51, 51);">꼼짝없이 체포되던 중 차 전복사고 후 검사로 오해받은 ‘지현수’는</span></p><p><span style="color: rgb(51, 51, 51);">실종된 의뢰인을 찾기 위해 검사로 위장해 수사를 시작한다.&nbsp;</span></p><p><br></p><p><span style="color: rgb(51, 51, 51);">“수사 방식이 남다르시네요? 검사답지 않게”</span></p><p><br></p><p><span style="color: rgb(51, 51, 51);">검사들의 검사, 일명 감찰부 미친 X ‘김화진’.</span></p><p><span style="color: rgb(51, 51, 51);">하늘 높은 줄 모르던 그가 좌천의 쓴맛을 보며 지내던 어느 날,</span></p><p><span style="color: rgb(51, 51, 51);">한 납치 사건을 조사하던 중 검사 행세를 하는 ‘지현수’와 만나게 된다.</span></p><p><span style="color: rgb(51, 51, 51);">단순한 납치로 여겼던 사건이 자신을 물 먹인 로펌 재벌 ‘권도훈’과 관련되어 있음을 알게 된다.</span></p><p><br></p><p><span style="color: rgb(51, 51, 51);">“나쁜 놈 잡는데 불법, 합법이 어딨습니까? 잡으면 장땡이지”</span></p><p><br></p><p><span style="color: rgb(51, 51, 51);">누명을 벗고자 하는 ‘지현수’와 ‘권도훈’을 잡고 싶은 ‘김화진’,</span></p><p><span style="color: rgb(51, 51, 51);">각자의 목표를 위해 손을 잡게 된 두 사람은</span></p><p><span style="color: rgb(51, 51, 51);">거대 로펌 재벌의 추악한 범죄를 파헤치다 전혀 뜻밖의 상황을 맞이하게 되는데...</span></p><p><br></p><p><span style="color: rgb(51, 51, 51);">작전은 완벽하게, 수사는 젠틀하게!</span></p><p><span style="color: rgb(51, 51, 51);">고품격 범죄 오락이 펼쳐진다!</span></p>', "img/ranking/4.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('주지훈', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('박성웅', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('최성은', '한국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '14', '4');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '15', '4');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '16', '4');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("아바타: 물의 길", "제임스 카메론", "SF", "192", "20221224", "12", '<h2><span style="color: rgb(51, 51, 51);">&lt;아바타: 물의 길&gt;은 판도라 행성에서&nbsp;</span></h2><p><span style="color: rgb(51, 51, 51);">"제이크 설리"와 "네이티리"가 이룬 가족이 겪게 되는 무자비한 위협과&nbsp;</span></p><p><span style="color: rgb(51, 51, 51);">살아남기 위해 떠나야 하는 긴 여정과 전투,&nbsp;</span></p><p><span style="color: rgb(51, 51, 51);">그리고 견뎌내야 할 상처에 대한 이야기를 그렸다.&nbsp;</span></p><p><br></p><p><span style="color: rgb(51, 51, 51);">월드와이드 역대 흥행 순위 1위를 기록한 전편 &lt;아바타&gt;에 이어</span></p><p><span style="color: rgb(51, 51, 51);">제임스 카메론 감독이 13년만에 선보이는 영화로,&nbsp;</span></p><p><span style="color: rgb(51, 51, 51);">샘 워싱턴, 조 샐다나, 시고니 위버, 스티븐 랭, 케이트 윈슬렛이 출연하고</span></p><p><span style="color: rgb(51, 51, 51);">존 랜도가 프로듀싱을 맡았다.</span></p>', "img/ranking/1.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('조 샐다나', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('샘 워싱턴', '영국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('시고니 위버', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('우나 채플린', '스페인');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('지오바니 리비시', '미국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '17', '5');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '18', '5');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '19', '5');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '20', '5');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '21', '5');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("어메이징 모리스", "토비 젠켈 " , "애니메이션", "93", "20230204", "0", '<h2><span style="color: rgb(68, 68, 68);">사기력 만렙 말하는 고양이 ‘모리스’와 친구들의 어메이징한 모험이 펼쳐진다!</span></h2><p><br></p><p><span style="color: rgb(68, 68, 68);">신기한 능력으로 성공적인 사기 행각을 이어가던 모리스와 친구들!</span></p><p><span style="color: rgb(68, 68, 68);">4차원 소녀 ‘멜리시아’에게 정체가 탄로나 어쩔 수 없이 그녀를 도와 마을에 숨겨진 비밀을 찾아 나선 그들은</span></p><p><span style="color: rgb(68, 68, 68);">세상을 지배하려는 절대악 ‘쥐마왕’의 음모를 알아채지만 뜻하지 않은 위험에 처한다.</span></p><p><span style="color: rgb(68, 68, 68);">가까스로 잡혀있던 ‘복숭아’를 구해낸 모리스와 친구들은 마을에서 탈출을 시도하고,</span></p><p><span style="color: rgb(68, 68, 68);">멜리시아는 허당 피리꾼 ‘키이스’와 함께 쥐마왕에게 맞서기 위해 진짜 마술피리를 찾아나서는데..</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">쥐마왕의 정체는 과연 무엇?</span></p><p><span style="color: rgb(68, 68, 68);">그리고 모리스와 친구들은 무사히 마을에서 벗어날 수 있을 것인가?!</span></p>',"img/ranking/13.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('휴 로리', '영국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('에밀리아 클라크', '영국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('데이빗 듈리스', '영국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('히메쉬 파텔', '영국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('성우', '22', '6');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('성우', '23', '6');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('성우', '24', '6');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('성우', '25', '6');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("영웅", "윤제균", "시대극", "120", "20221221", "12", '<h2><span style="color: rgb(68, 68, 68);">어머니 ‘조마리아’(나문희)와 가족들을 남겨둔 채</span></h2><p><span style="color: rgb(68, 68, 68);">고향을 떠나온 대한제국 의병대장 ‘안중근’(정성화).</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">동지들과 함께 네 번째 손가락을 자르는 단지동맹으로</span></p><p><span style="color: rgb(68, 68, 68);">조국 독립의 결의를 다진 안중근은</span></p><p><span style="color: rgb(68, 68, 68);">조선 침략의 원흉인 ‘이토 히로부미’를</span></p><p><span style="color: rgb(68, 68, 68);">3년 내에 처단하지 못하면 자결하기로 피로 맹세한다.</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">그 약속을 지키기 위해 블라디보스토크를 찾은 안중근.</span></p><p><span style="color: rgb(68, 68, 68);">오랜 동지 ‘우덕순’(조재윤), 명사수 ‘조도선’(배정남), 독립군 막내 ‘유동하’(이현우),</span></p><p><span style="color: rgb(68, 68, 68);">독립군을 보살피는 동지 ‘마진주’(박진주)와 함께 거사를 준비한다.</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">한편 자신의 정체를 감춘 채 이토 히로부미에게 접근해</span></p><p><span style="color: rgb(68, 68, 68);">적진 한복판에서 목숨을 걸고 정보를 수집하던 독립군의 정보원 ‘설희’(김고은)는</span></p><p><span style="color: rgb(68, 68, 68);">이토 히로부미가 곧 러시아와의 회담을 위해</span></p><p><span style="color: rgb(68, 68, 68);">하얼빈을 찾는다는 일급 기밀을 다급히 전한다.</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">드디어 1909년 10월 26일,</span></p><p><span style="color: rgb(68, 68, 68);">이날만을 기다리던 안중근은</span></p><p><span style="color: rgb(68, 68, 68);">하얼빈역에 도착한 이토 히로부미를 향해</span></p><p><span style="color: rgb(68, 68, 68);">주저 없이 방아쇠를 당긴다.</span></p><p><span style="color: rgb(68, 68, 68);">현장에서 체포된 그는 전쟁 포로가 아닌 살인의 죄목으로,</span></p><p><span style="color: rgb(68, 68, 68);">조선이 아닌 일본 법정에 서게 되는데…</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">누가 죄인인가, 누가 영웅인가!</span></p>', "img/ranking/3.jpg" );

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('정성화', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('김고은', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('나문희', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('조재윤', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('배정남', '한국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '26', '7');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '27', '7');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '28', '7');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '29', '7');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '30', '7');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("오늘 밤, 세계에서 이 사랑이 사라진다 해도", "미키 타카히로 " , "로맨스", "121", "20230104", "12", '<h2><span style="color: rgb(68, 68, 68);">“카미야 토루에 대해 잊지 말 것”</span></h2><p><br></p><p><span style="color: rgb(68, 68, 68);">자고 일어나면 전날의 기억을 잃는</span></p><p><span style="color: rgb(68, 68, 68);">‘선행성 기억상실증’에 걸린 소녀 ‘마오리’</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">“내일의 마오리도 내가 즐겁게 해줄 거야”</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">누구에게도 기억되지 않는</span></p><p><span style="color: rgb(68, 68, 68);">무색무취의 평범한 소년 ‘토루’</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">매일 밤 사랑이 사라지는 세계,</span></p><p><span style="color: rgb(68, 68, 68);">그럼에도 불구하고,</span></p><p><span style="color: rgb(68, 68, 68);">다음 날 서로를 향한 애틋한 고백을 반복하는</span></p><p><span style="color: rgb(68, 68, 68);">두 소년, 소녀의 가장 슬픈 청춘담</span></p>',"img/ranking/7.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('후쿠모토 리코', '일본');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('미치에다 슌스케', '일본');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('후루카와 코토네', '일본');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('마츠모토 호노카', '일본');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '31', '8');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '32', '8');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '33', '8');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '34', '8');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("교섭", "임순례" , "드라마", "108", "20230118", "12", '<h2><span style="color: rgb(68, 68, 68);">“어떤 경우라도 희생자를 안 만드는 게 이 협상의 기조 아닙니까?”</span></h2><p><br></p><p><span style="color: rgb(68, 68, 68);">분쟁지역 아프가니스탄에서 한국인들이 탈레반에게 납치되는 최악의 피랍사건이 발생한다.</span></p><p><span style="color: rgb(68, 68, 68);">교섭 전문이지만 아프가니스탄은 처음인 외교관 재호(황정민)가 현지로 향하고,</span></p><p><span style="color: rgb(68, 68, 68);">국정원 요원 대식(현빈)을 만난다.</span></p><p><span style="color: rgb(68, 68, 68);">원칙이 뚜렷한 외교관과 현지 사정에 능통한 국정원 요원.</span></p><p><span style="color: rgb(68, 68, 68);">입장도 방법도 다르지만, 두 사람은 인질을 살려야 한다는 목표를 향해 함께 나아간다.</span></p><p><span style="color: rgb(68, 68, 68);">살해 시한은 다가오고, 협상 상대, 조건 등이 시시각각 변하는 상황에서</span></p><p><span style="color: rgb(68, 68, 68);">교섭의 성공 가능성은 점점 희박해져 가는데...</span></p>',"img/ranking/14.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('황정민', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('현빈', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('강기영', '한국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '35', '9');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '36', '9');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '37', '9');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("두다다쿵: 후후섬의 비밀", "김지윤" , "애니메이션", "83", "20230213", "0", '<h2><span style="color: rgb(68, 68, 68);">“두다, 후후섬에 가면 엄마를 찾을 수 있을 거야!"</span></h2><p><br></p><p><span style="color: rgb(68, 68, 68);">두다를 위해 친구들이 뭉쳤다!</span></p><p><span style="color: rgb(68, 68, 68);">후후섬에 가기 위해서는 신비의 꽃, 빛나는 크리스털을 찾아야 해!</span></p><p><span style="color: rgb(68, 68, 68);">우리 핑카 타고 모험을 떠나볼까?</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">“우와! 전설의 눈토끼 마을에 도착했어!”</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">뭐? 보름달이 뜰 때마다 용이 내려와 아기 토끼들을 데려간다고?</span></p><p><span style="color: rgb(68, 68, 68);">용으로부터 아기 토끼들을 구하고</span></p><p><span style="color: rgb(68, 68, 68);">후후섬에 가기 위한 보물들을 얻어야 해!</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">다들 함께 할 준비됐지?</span></p><p><span style="color: rgb(68, 68, 68);">다 함께 두다다다 출발 =3=3</span></p>',"img/ranking/9.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('이영아', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('장경희', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('엄상현', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('이소영', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('이은정', '한국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('성우', '38', '10');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('성우', '39', '10');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('성우', '40', '10');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('성우', '41', '10');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('성우', '42', '10');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("서치 2", "니콜라스 D 존슨" , "미스터리", "110", "20230211", "12", '<h2><span style="color: rgb(68, 68, 68);">여행을 끝내고 월요일 귀국을 알린 엄마의 영상통화</span></h2><p><span style="color: rgb(68, 68, 68);">그리고 마중 나간 딸</span></p><p><span style="color: rgb(68, 68, 68);">그러나 엄마가 사라졌다</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">경찰에 도움을 요청하지만, 결정적인 단서들이 나오지 않는 가운데</span></p><p><span style="color: rgb(68, 68, 68);">딸 ‘준’은 엄마의 흔적을 찾기 위해</span></p><p><span style="color: rgb(68, 68, 68);">엄마가 방문한 호텔의 CCTV, 같이 간 지인의 SNS,</span></p><p><span style="color: rgb(68, 68, 68);">거리뷰 지도까지 온라인에 남아있는 모든 흔적을 검색하는데…</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">이번에는 딸이 사라진 엄마의 흔적을 검색하다!</span></p>',"img/ranking/10.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('스톰 리드', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('켄 렁', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('다니엘 헤니', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('니아 롱', '미국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '43', '11');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '44', '11');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '45', '11');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '46', '11');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("앤트맨과 와스프: 퀀텀매니아", "페이튼 리드" , "액션", "124", "20230213", "12", '<h2><span style="color: rgb(68, 68, 68);">슈퍼히어로 파트너인 "스캇 랭"(폴 러드)과 "호프 반 다인"(에반젤린 릴리),</span></h2><p><span style="color: rgb(68, 68, 68);">호프의 부모 "재닛 반 다인"(미셸 파이퍼)과 "행크 핌"(마이클 더글라스),</span></p><p><span style="color: rgb(68, 68, 68);">그리고 스캇의 딸 "캐시 랭"(캐서린 뉴튼)까지</span></p><p><span style="color: rgb(68, 68, 68);">미지의 "양자 영역" 세계 속에 빠져버린 "앤트맨 패밀리".</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">그 곳에서 새로운 존재들과 무한한 우주를 다스리는 정복자 "캉"을 만나며,</span></p><p><span style="color: rgb(68, 68, 68);">그 누구도 예상 못 한 모든 것의 한계를 뛰어넘는 모험을 시작하게 되는데…</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">2023년 첫 번째 마블 블록버스터</span></p><p><span style="color: rgb(68, 68, 68);">2월, 무한한 우주의 정복자가 깨어난다!</span></p>',"img/ranking/11.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('폴 러드', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('에반젤린 릴리', '캐나다');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('미셸 파이퍼', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('마이클 더글라스', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('조나단 메이저스', '미국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '47', '12');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '48', '12');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '49', '12');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '50', '12');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '51', '12');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("원 웨이", "앤드류 베어드" , "액션", "97", "20230209", "15", '<h2><span style="color: rgb(68, 68, 68);">죽여라! 도망쳐라! 살고 싶다면!</span></h2><p><span style="color: rgb(68, 68, 68);">돌아갈 수 없는 편도행 버스 안에서 벌어지는 숨막히는 긴장감!</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">마약 조직의 보스 "빅"의 돈과 마약을 훔쳐 달아난 "프레디"는 야간 버스에 탑승해 도망친다.</span></p><p><span style="color: rgb(68, 68, 68);">"빅"의 눈을 피해 도망갈 곳을 찾는 "프레디"는 친구인 "제이제이"와 아버지에게 전화를 걸며 도망칠 방법을 찾는다.</span></p><p><span style="color: rgb(68, 68, 68);">한편, 버스 안에는 집을 가출한 "레이첼"이 함께 탑승해 "프레디"에게 관심을 가지는데...</span></p><p><span style="color: rgb(68, 68, 68);">버스에서 내릴 수 없다면 목숨을 걸고 도망가야 한다.</span></p><p><span style="color: rgb(68, 68, 68);">과연, "프레디"는 무사히 버스에서 내려 가족을 만날 수 있을까?</span></p>',"img/ranking/12.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('머신 건 켈리', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('케빈 베이컨', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('트래비스 핌멜', '오스트레일리아');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '52', '13');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '53', '13');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '54', '13');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '43', '13');
-- 이미 존재해서 갯수가 위와 갯수가 다름

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("다음 소희", "정주리" , "드라마", "138", "20230208", "15", '<h2><span style="color: rgb(68, 68, 68);">“나 이제 사무직 여직원이다?”</span></h2><p><span style="color: rgb(68, 68, 68);">춤을 좋아하는 씩씩한 열여덟 고등학생 소희.</span></p><p><span style="color: rgb(68, 68, 68);">졸업을 앞두고 현장실습을 나가게 되면서 점차 변하기 시작한다.</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">“막을 수 있었잖아. 근데 왜 보고만 있었냐고”</span></p><p><span style="color: rgb(68, 68, 68);">오랜만에 복직한 형사 유진.</span></p><p><span style="color: rgb(68, 68, 68);">사건을 조사하던 중, 새로운 사실을 발견하고 그 자취를 쫓는다.</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">같은 공간 다른 시간, 언젠가 마주쳤던 두 사람의 이야기.</span></p><p><span style="color: rgb(68, 68, 68);">우리는 모두 그 애를 만난 적이 있다.</span></p>',"img/ranking/18.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('배두나', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('김시은', '한국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '55', '14');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '56', '14');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("유령", "이해영" , "액션", "133", "20230118", "15", '<h2><span style="color: rgb(68, 68, 68);">“유령에게 고함. 작전을 시작한다”</span></h2><p><br></p><p><span style="color: rgb(68, 68, 68);">1933년, 일제강점기 경성. 항일조직 ‘흑색단’의 스파이인 ‘유령’이 비밀리에 활약하고 있다.</span></p><p><span style="color: rgb(68, 68, 68);">새로 부임한 경호대장 카이토는 ‘흑색단’의 총독 암살 시도를 막기 위해</span></p><p><span style="color: rgb(68, 68, 68);">조선총독부 내의 ‘유령’을 잡으려는 덫을 친다.</span></p><p><span style="color: rgb(68, 68, 68);">영문도 모른 채, ‘유령’으로 의심받고 벼랑 끝 외딴 호텔에 갇힌 용의자들.</span></p><p><span style="color: rgb(68, 68, 68);">총독부 통신과 감독관 쥰지, 암호문 기록 담당 차경, 정무총감 비서 유리코,</span></p><p><span style="color: rgb(68, 68, 68);">암호 해독 담당 천계장, 통신과 직원 백호. 이들에게 주어진 시간은 단 하루 뿐.</span></p><p><span style="color: rgb(68, 68, 68);">기필코 살아나가 동지들을 구하고 총독 암살 작전을 성공시켜야 하는 ‘유령’과</span></p><p><span style="color: rgb(68, 68, 68);">무사히 집으로 돌아가고 싶은 이들 사이, 의심과 경계는 점점 짙어지는데…</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">과연 ‘유령’은 작전에 성공할 수 있을 것인가?</span></p><p><span style="color: rgb(68, 68, 68);">“성공할 때까지 멈춰서는 안 된다”</span></p>',"img/ranking/15.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('설경구', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('이하늬', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('박소담', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('박해수', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('서현우', '한국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '57', '15');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '58', '15');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '59', '15');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '60', '15');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '61', '15');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("장화신은 고양이: 끝내주는 모험", "조엘 크로포드" , "애니메이션", "102", "20230104", "0", '<h2><span style="color: rgb(68, 68, 68);">아홉 개의 목숨 중 단 하나의 목숨만 남은 장화신은 고양이.</span></h2><p><span style="color: rgb(68, 68, 68);">마지막 남은 목숨을 지키기 위해 히어로의 삶 대신 반려묘의 삶을 선택한 그에게 찾아온 마지막 기회, 바로 소원을 들어주는 소원별이 있는 곳을 알려주는 지도!</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">잃어버린 목숨을 되찾고 다시 히어로가 되기를 꿈꾸는 장화신은 고양이는</span></p><p><span style="color: rgb(68, 68, 68);">뜻밖의 동료가 된 앙숙 파트너 "키티 말랑손", 그저 친구들과 함께 라면 모든 게 행복한 강아지 "페로"와 함께</span></p><p><span style="color: rgb(68, 68, 68);">소원별을 찾기 위해 길을 떠난다.</span></p><p><span style="color: rgb(68, 68, 68);">그리고 소원별을 노리는 또 다른 빌런들과 마주치게 되는데…</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">새해를 여는 끝내주는 모험이 시작된다!</span></p>',"img/ranking/16.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('안토니오 반데라스', '스페인');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('셀마 헤이엑', '멕시코');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('올리비아 콜맨', '영국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '62', '16');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '63', '16');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '64', '16');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("울프 하운드", "마이클 B. 체이트" , "전쟁", "130", "20230209", "15", '<h2><span style="color: rgb(68, 68, 68);">코드네임 ‘울프 하운드’</span></h2><p><span style="color: rgb(68, 68, 68);">런던 폭격을 막기 위한 비밀 전투 실화</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">연합군의 전투비행단이 독일 전투기에 급습을 당한다.</span></p><p><span style="color: rgb(68, 68, 68);">홀로 적진에 추락한 파일럿은 독일군의 추격을 받고</span></p><p><span style="color: rgb(68, 68, 68);">런던 폭격의 일급 작전인 코드네임 ‘울프 하운드’를 알게 된다.</span></p><p><span style="color: rgb(68, 68, 68);">독일군 기지에 잠입해 포로로 잡힌 동료를 탈출시키고</span></p><p><span style="color: rgb(68, 68, 68);">폭격을 막기 위해 함께 지상전과 공중전을 벌이는데…</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">120분간의 논스톱 전쟁 액션을 만난다!</span></p>',"img/ranking/17.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('제임스 매슬로', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('트레버 도노반', '미국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '65', '17');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '66', '17');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("스톰보이", "숀 시트" , "가족영화", "99", "20230213", "0", '<h2><span style="color: rgb(68, 68, 68);">저의 특별한 ‘새’ 친구들을 소개합니다!</span></h2><p><br></p><p><span style="color: rgb(68, 68, 68);">외딴 해변가에 아빠와 단둘이 살고 있는 ‘마이클’.</span></p><p><span style="color: rgb(68, 68, 68);">무차별적인 사냥으로 어미를 잃은 아기 펠리컨 세 마리를 발견하고,</span></p><p><span style="color: rgb(68, 68, 68);">마을 원주민 ‘핑거본’의 도움으로 아기 펠리컨들의 집사 생활을 시작한다.</span></p><p><span style="color: rgb(68, 68, 68);">그러던 어느 날, 폭우로 바다에 빠진 아빠를 펠리컨 ‘퍼시벌’이 구하게 되고</span></p><p><span style="color: rgb(68, 68, 68);">이 사건이 매스컴에 관심을 받기 시작하자</span></p><p><span style="color: rgb(68, 68, 68);">펠리컨 사냥꾼들이 다시 해변가로 몰려드는데…</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">어느 날 찾아온 가장 특별한 ‘새’상! 끝까지 지켜 줄게!</span></p>',"img/ranking/2.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('핀 리틀', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('제이 코트니', '오스트레일리아');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('제프리 러쉬', '호주');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '67', '18');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '68', '18');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '69', '18');

/*  영화 및 배우 절취선  */

INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("강남","서울","서울특별시 강남구 강남대로 438 (역삼동, 스타플렉스)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("강변","서울","서울특별시 광진구 광나루로56길 85 (구의동, 테크노마트 10층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("건대입구","서울","서울시 서울특별시 광진구 아차산로30길 26");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("구로","서울","서울특별시 구로구 구로중앙로 152 (구로동, AK플라자(구 애경백화점) 6층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("대학로","서울","서울특별시 종로구 대명길 28 (명륜동)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("등촌","서울","서울 강서구 공항대로45길 63");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("명동","서울","서울특별시 중구 명동길 14 (명동, 눈스퀘어 8층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("미아","서울","서울특별시 강북구 도봉로 34 (미아동, 트레지오 쇼핑몰 9층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("방학","서울","서울특별시 도봉구 방학동 707-6, 4F~8F");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("불광","서울","서울특별시 은평구 불광로 20 (대조동, 팜스퀘어 11층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("송파","서울","서울특별시 송파구 충민로 66 (문정동, 가든파이브 라이프 영관 10층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("광교","경기","경기도 수원시 영통구 광교호수공원로 320(하동) 갤러리아백화점 광교점 10층");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("구리","경기","경기도 구리시 경춘로 243 (인창동, 2층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("김포","경기","경기도 김포시 풍무로 128 김포풍무웰라움퍼펙트시티 5층");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("동탄","경기","경기도 화성시 동탄중앙로 220 (반송동, 메타폴리스 A블럭 3층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("야탑","경기","경기도 성남시 분당구 성남대로925번길 16 (야탑동, 테마폴리스빌딩 지하2층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("계양","인천","인천광역시 계양구 장제로 738 (작전동, 메트로몰 8층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("부평","인천","인천광역시 부평구 마장로 489 (청천동, 아이즈빌아울렛)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("연수역","인천","인천광역시 연수구 벚꽃로 106 8층 (청학동, 연수광장프라자)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("청라","인천","인천광역시 서구 청라루비로 76 (청라동, 스퀘어세븐 3층~4층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("주안역","인천","인천광역시 미추홀구 염창로 58 (주안동, 카라아울렛 6층)");

INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("대연","부산","부산광역시 남구 수영로 305 (대연동, 스파크 5층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("동래","부산","부산광역시 동래구 중앙대로 1523 (온천동, SK허브스카이 6층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("서면","부산","부산광역시 부산진구 동천로 4 (전포동, 지오플레이스 6층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("센텀","부산","부산광역시 해운대구 센텀남대로 35 (우동, 신세계센텀시티 7층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("화명","부산","부산광역시 북구 화명대로 16 (화명동, 센추리빌딩)");



INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","70","1");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","50","1");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","2D","50","1");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","30","2");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","50","2");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","70","3");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("5관","2D","70","3");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","50","3");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","2D","50","3");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","30","4");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","50","4");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","50","4");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","50","5");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","50","5");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("5관","3D","50","5");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","50","6");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","50","6");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("5관","3D","50","6");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","70","7");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","50","7");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","2D","50","7");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","70","8");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","50","8");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","70","8");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","50","9");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","70","9");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("5관","3D","70","9");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","50","10");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","70","10");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("5관","3D","30","10");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","70","11");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","50","11");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","2D","30","11");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","30","12");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","70","12");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","50","12");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","70","13");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","30","13");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("5관","3D","50","13");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","30","14");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","50","14");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("5관","3D","70","14");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","70","15");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","50","15");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","2D","30","16");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","30","16");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","70","17");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","50","17");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","70","18");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","30","18");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","50","19");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","30","19");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","50","20");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","70","20");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","70","21");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","50","21");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","2D","30","22");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","30","22");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","70","23");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","50","23");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","70","24");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","30","24");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("5관","3D","50","24");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","30","25");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","50","25");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","70","26");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","1","1");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","1","2");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","1","2");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","1","3");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","1","3");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","1","4");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","1","4");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","1","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","1","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","1","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","1","6");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","1","6");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","1","7");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","1","7");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","1","8");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","1","8");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","1","9");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","1","9");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","1","10");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","1","10");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","1","11");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","1","12");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","1","13");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","1","10");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","1","11");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","1","12");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","1","13");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","1","14");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","1","15");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","1","16");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","1","17");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","1","18");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","19");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","1","20");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","1","21");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","1","22");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","1","23");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","1","24");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","1","25");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","1","26");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","1","27");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","1","28");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","1","29");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","1","30");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","1","31");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","1","32");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","1","33");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","1","34");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","1","35");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","1","36");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","1","37");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","1","38");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","1","39");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","1","40");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","1","41");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","1","42");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","1","43");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","1","44");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","1","45");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","1","46");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","1","47");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","1","48");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","1","49");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","1","50");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","1","51");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","1","52");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","1","53");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","1","54");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","1","55");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","1","56");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","1","57");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","1","58");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","1","59");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","1","60");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","61");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","1","62");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","1","63");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","1","64");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","1","65");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","1","24");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","1","25");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","1","26");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","1","27");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","1");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","2");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","2","2");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","2","3");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","2","3");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","2","4");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","2","4");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","2","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","2","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","6");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","2","6");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","7");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","2","7");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","2","8");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","2","8");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","2","9");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","2","9");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","2","10");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","2","10");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","11");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","12");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","2","13");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","2","14");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","2","15");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","2","16");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","2","17");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","2","18");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","19");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","20");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","2","21");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","22");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","2","23");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","2","24");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","2","25");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","2","26");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","2","27");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","2","28");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","29");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","30");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","2","31");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","2","32");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","2","33");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","2","34");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","2","35");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","2","36");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","2","37");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","38");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","39");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","2","40");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","41");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","2","42");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","2","43");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","2","44");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","2","45");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","2","46");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","2","47");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","2","48");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","49");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","50");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","2","51");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","52");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","53");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","2","54");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","2","55");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","2","56");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","2","57");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","2","58");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","2","59");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","2","60");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","61");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","62");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","2","63");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","2","64");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","2","65");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","2","65");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","3","1");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","3","2");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","3","2");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","3","3");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","3","3");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","3","4");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","3","4");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","3","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","3","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","3","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","3","6");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","3","6");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","3","7");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","3","7");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","3","8");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","3","8");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","3","9");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","3","9");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","3","10");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","3","10");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","3","11");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","3","12");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","3","13");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","3","14");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","3","15");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","3","16");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","3","17");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","3","18");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","3","19");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","3","20");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","3","21");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","3","22");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","3","23");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","3","24");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","3","25");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","3","26");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","3","27");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","3","28");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","3","29");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","3","30");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","3","31");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","3","32");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","3","33");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","3","34");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","3","35");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","3","36");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","3","37");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","3","38");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","3","39");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","3","40");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","3","41");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","3","42");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","3","43");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","3","44");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","3","45");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","3","46");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","3","47");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","3","48");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","3","49");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","3","50");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","3","51");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","3","52");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","3","53");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","3","54");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","3","55");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","3","56");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","3","57");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","3","58");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","3","59");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","3","60");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","3","61");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","3","62");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","3","63");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","3","64");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","3","65");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","3","65");


INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","4","1");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","4","2");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","4","2");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","4","3");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","4","3");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","4","4");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","4","4");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","4","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","4","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","4","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","4","6");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","4","6");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","4","7");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","4","7");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","4","8");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","4","8");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","4","9");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","4","9");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","4","10");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","4","10");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","4","11");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","4","12");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","4","13");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","4","14");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","4","15");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","4","16");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","4","17");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","4","18");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","4","19");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","4","20");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","4","21");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","4","22");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","4","23");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","4","24");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","4","25");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","4","26");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","4","27");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","4","28");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","4","29");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","4","30");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","4","31");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","4","32");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","4","33");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","4","34");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","4","35");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","4","36");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","4","37");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","4","38");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","4","39");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","4","40");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","4","41");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","4","42");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","4","43");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","4","44");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","4","45");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","4","46");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","4","47");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","4","48");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","4","49");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","4","50");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","4","51");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","4","52");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","4","53");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","4","54");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","4","55");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","14:00:00","16:10:00","4","56");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","13:50:00","16:00:00","4","57");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:30:00","16:10:00","4","58");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","16:10:00","4","59");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","17:50:00","20:10:00","4","60");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","4","61");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","4","62");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","4","63");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","12:50:00","15:10:00","4","64");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","15:30:00","18:00:00","4","65");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-15","10:50:00","13:10:00","4","65");


INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","12:50:00","15:10:00","1","1");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","12:50:00","15:10:00","1","2");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","15:30:00","18:00:00","1","2");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","10:50:00","13:10:00","1","3");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","14:00:00","16:10:00","1","3");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","12:50:00","16:00:00","1","4");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","15:30:00","18:10:00","1","4");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","12:50:00","16:10:00","1","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","17:50:00","20:10:00","1","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","15:50:00","18:10:00","1","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","12:50:00","15:10:00","1","6");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","15:30:00","18:00:00","1","6");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","12:50:00","15:10:00","1","7");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","15:30:00","18:00:00","1","7");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","10:50:00","13:10:00","1","8");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","14:00:00","16:10:00","1","8");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","13:50:00","16:00:00","1","9");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","12:30:00","16:10:00","1","9");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","12:50:00","16:10:00","1","10");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","17:50:00","20:10:00","1","10");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","12:50:00","15:10:00","1","11");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","12:50:00","15:10:00","1","12");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","15:30:00","18:00:00","1","13");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","12:50:00","15:10:00","1","10");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","12:50:00","15:10:00","1","11");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","15:30:00","18:00:00","1","12");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","10:50:00","13:10:00","1","13");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","14:00:00","16:10:00","1","14");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","13:50:00","16:00:00","1","15");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:30:00","16:10:00","1","16");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:50:00","16:10:00","1","17");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","17:50:00","20:10:00","1","18");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:50:00","15:10:00","2","19");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:50:00","15:10:00","1","20");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","15:30:00","18:00:00","1","21");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:50:00","15:10:00","1","22");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","15:30:00","18:00:00","1","23");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","10:50:00","13:10:00","1","24");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","14:00:00","16:10:00","1","25");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","13:50:00","16:00:00","1","26");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:30:00","16:10:00","1","27");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","16:10:00","1","28");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","15:10:00","1","29");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","15:10:00","1","30");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","15:30:00","18:00:00","1","31");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","10:50:00","13:10:00","1","32");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","14:00:00","16:10:00","1","33");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","13:50:00","16:00:00","1","34");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:30:00","16:10:00","1","35");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:50:00","16:10:00","1","36");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","17:50:00","20:10:00","1","37");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:50:00","15:10:00","1","38");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:50:00","15:10:00","1","39");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","15:30:00","18:00:00","1","40");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:50:00","15:10:00","1","41");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","15:30:00","18:00:00","1","42");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","10:50:00","13:10:00","1","43");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","14:00:00","16:10:00","1","44");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","13:50:00","16:00:00","1","45");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:30:00","16:10:00","1","46");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","16:10:00","1","47");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","17:50:00","20:10:00","1","48");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","15:10:00","1","49");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","15:10:00","1","50");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","15:30:00","18:00:00","1","51");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:50:00","15:10:00","1","52");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:50:00","15:10:00","1","53");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","15:30:00","18:00:00","1","54");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","10:50:00","13:10:00","1","55");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","14:00:00","16:10:00","1","56");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","13:50:00","16:00:00","1","57");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:30:00","16:10:00","1","58");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:50:00","16:10:00","1","59");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","17:50:00","20:10:00","1","60");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:50:00","15:10:00","2","61");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:50:00","15:10:00","1","62");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","15:30:00","18:00:00","1","63");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:50:00","15:10:00","1","64");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","15:30:00","18:00:00","1","65");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","10:50:00","13:10:00","1","24");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","14:00:00","16:10:00","1","25");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","13:50:00","16:00:00","1","26");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:30:00","16:10:00","1","27");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","12:50:00","15:10:00","2","1");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","12:50:00","15:10:00","2","2");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","15:30:00","18:00:00","2","2");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","10:50:00","13:10:00","2","3");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","14:00:00","16:10:00","2","3");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","13:50:00","16:00:00","2","4");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","12:30:00","16:10:00","2","4");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","12:50:00","16:10:00","2","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","17:50:00","20:10:00","2","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","12:50:00","15:10:00","2","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","12:50:00","15:10:00","2","6");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","15:30:00","18:00:00","2","6");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:50:00","15:10:00","2","7");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","15:30:00","18:00:00","2","7");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","10:50:00","13:10:00","2","8");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","14:00:00","16:10:00","2","8");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","13:50:00","16:00:00","2","9");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-21","12:30:00","16:10:00","2","9");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-21","12:50:00","16:10:00","2","10");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-21","17:50:00","20:10:00","2","10");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-21","12:50:00","15:10:00","2","11");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-21","12:50:00","15:10:00","2","12");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-21","15:30:00","18:00:00","2","13");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-21","14:00:00","16:10:00","2","14");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-21","13:50:00","16:00:00","2","15");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-21","12:30:00","16:10:00","2","16");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-21","12:50:00","16:10:00","2","17");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-21","17:50:00","20:10:00","2","18");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-21","12:50:00","15:10:00","2","19");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-22","12:50:00","15:10:00","2","20");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","15:30:00","18:00:00","2","21");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:50:00","15:10:00","2","22");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","15:30:00","18:00:00","2","23");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","10:50:00","13:10:00","2","24");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","14:00:00","16:10:00","2","25");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","13:50:00","16:00:00","2","26");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:30:00","16:10:00","2","27");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","16:10:00","2","28");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:50:00","15:10:00","2","29");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:50:00","15:10:00","2","30");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","15:30:00","18:00:00","2","31");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","10:50:00","13:10:00","2","32");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","14:00:00","16:10:00","2","33");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","13:50:00","16:00:00","2","34");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","12:30:00","16:10:00","2","35");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","16:10:00","2","36");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","17:50:00","20:10:00","2","37");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:50:00","15:10:00","2","38");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","12:50:00","15:10:00","2","39");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","15:30:00","18:00:00","2","40");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","15:10:00","2","41");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","15:30:00","18:00:00","2","42");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","10:50:00","13:10:00","2","43");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","14:00:00","16:10:00","2","44");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-21","13:50:00","16:00:00","2","45");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","12:30:00","16:10:00","2","46");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","12:50:00","16:10:00","2","47");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-21","17:50:00","20:10:00","2","48");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","12:50:00","15:10:00","2","49");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","15:10:00","2","50");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","15:30:00","18:00:00","2","51");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","15:10:00","2","52");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","15:10:00","2","53");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","15:30:00","18:00:00","2","54");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","10:50:00","13:10:00","2","55");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","14:00:00","16:10:00","2","56");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","13:50:00","16:00:00","2","57");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:30:00","16:10:00","2","58");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:50:00","16:10:00","2","59");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","17:50:00","20:10:00","2","60");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","12:50:00","15:10:00","2","61");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","12:50:00","15:10:00","2","62");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","15:30:00","18:00:00","2","63");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","12:50:00","15:10:00","2","64");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","15:30:00","18:00:00","2","65");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","10:50:00","13:10:00","2","65");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:50:00","15:10:00","3","1");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","12:50:00","15:10:00","3","2");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","15:30:00","18:00:00","3","2");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","10:50:00","13:10:00","3","3");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","14:00:00","16:10:00","3","3");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","13:50:00","16:00:00","3","4");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","12:30:00","16:10:00","3","4");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","12:50:00","16:10:00","3","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","17:50:00","20:10:00","3","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:50:00","15:10:00","3","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:50:00","15:10:00","3","6");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","15:30:00","18:00:00","3","6");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","15:10:00","3","7");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","15:30:00","18:00:00","3","7");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","10:50:00","13:10:00","3","8");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","14:00:00","16:10:00","3","8");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","13:50:00","16:00:00","3","9");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:30:00","16:10:00","3","9");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","16:10:00","3","10");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","17:50:00","20:10:00","3","10");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","15:10:00","3","11");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","15:10:00","3","12");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","15:30:00","18:00:00","3","13");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","14:00:00","16:10:00","3","14");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","13:50:00","16:00:00","3","15");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:30:00","16:10:00","3","16");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","16:10:00","3","17");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","17:50:00","20:10:00","3","18");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","15:10:00","3","19");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","15:10:00","3","20");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","15:30:00","18:00:00","3","21");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","15:10:00","3","22");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","15:30:00","18:00:00","3","23");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","10:50:00","13:10:00","3","24");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","14:00:00","16:10:00","3","25");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","13:50:00","16:00:00","3","26");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:30:00","16:10:00","3","27");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:50:00","16:10:00","3","28");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:50:00","15:10:00","3","29");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:50:00","15:10:00","3","30");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","15:30:00","18:00:00","3","31");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","10:50:00","13:10:00","3","32");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","14:00:00","16:10:00","3","33");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","13:50:00","16:00:00","3","34");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","12:30:00","16:10:00","3","35");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","12:50:00","16:10:00","3","36");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","17:50:00","20:10:00","3","37");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","12:50:00","15:10:00","3","38");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","12:50:00","15:10:00","3","39");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-21","15:30:00","18:00:00","3","40");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-22","12:50:00","15:10:00","3","41");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","15:30:00","18:00:00","3","42");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","10:50:00","13:10:00","3","43");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","14:00:00","16:10:00","3","44");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","13:50:00","16:00:00","3","45");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-23","12:30:00","16:10:00","3","46");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-24","12:50:00","16:10:00","3","47");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-25","17:50:00","20:10:00","3","48");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-26","12:50:00","15:10:00","3","49");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-27","12:50:00","15:10:00","3","50");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-28","15:30:00","18:00:00","3","51");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:50:00","15:10:00","3","52");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","12:50:00","15:10:00","3","53");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","15:30:00","18:00:00","3","54");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","10:50:00","13:10:00","3","55");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","14:00:00","16:10:00","3","56");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","13:50:00","16:00:00","3","57");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:30:00","16:10:00","3","58");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","16:10:00","3","59");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","17:50:00","20:10:00","3","60");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:50:00","15:10:00","3","61");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:50:00","15:10:00","3","62");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","15:30:00","18:00:00","3","63");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","12:50:00","15:10:00","3","64");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-21","15:30:00","18:00:00","3","65");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-23","10:50:00","13:10:00","3","65");


INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:50:00","15:10:00","4","1");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:50:00","15:10:00","4","2");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","15:30:00","18:00:00","4","2");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","10:50:00","13:10:00","4","3");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","14:00:00","16:10:00","4","3");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-21","13:50:00","16:00:00","4","4");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-22","12:30:00","16:10:00","4","4");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-23","12:50:00","16:10:00","4","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-22","17:50:00","20:10:00","4","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:50:00","15:10:00","4","5");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:50:00","15:10:00","4","6");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","15:30:00","18:00:00","4","6");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:50:00","15:10:00","4","7");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","15:30:00","18:00:00","4","7");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","10:50:00","13:10:00","4","8");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","14:00:00","16:10:00","4","8");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","13:50:00","16:00:00","4","9");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:30:00","16:10:00","4","9");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","16:10:00","4","10");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","17:50:00","20:10:00","4","10");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:50:00","15:10:00","4","11");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:50:00","15:10:00","4","12");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","15:30:00","18:00:00","4","13");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","14:00:00","16:10:00","4","14");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","13:50:00","16:00:00","4","15");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:30:00","16:10:00","4","16");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","12:50:00","16:10:00","4","17");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","17:50:00","20:10:00","4","18");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","12:50:00","15:10:00","4","19");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","12:50:00","15:10:00","4","20");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","15:30:00","18:00:00","4","21");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","12:50:00","15:10:00","4","22");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","15:30:00","18:00:00","4","23");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","10:50:00","13:10:00","4","24");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","14:00:00","16:10:00","4","25");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","13:50:00","16:00:00","4","26");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","12:30:00","16:10:00","4","27");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","12:50:00","16:10:00","4","28");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","12:50:00","15:10:00","4","29");
INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","12:50:00","15:10:00","4","30");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","15:30:00","18:00:00","4","31");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","10:50:00","13:10:00","4","32");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","14:00:00","16:10:00","4","33");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","13:50:00","16:00:00","4","34");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:30:00","16:10:00","4","35");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","12:50:00","16:10:00","4","36");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","17:50:00","20:10:00","4","37");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:50:00","15:10:00","4","38");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:50:00","15:10:00","4","39");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","15:30:00","18:00:00","4","40");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:50:00","15:10:00","4","41");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","15:30:00","18:00:00","4","42");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","10:50:00","13:10:00","4","43");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","14:00:00","16:10:00","4","44");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","13:50:00","16:00:00","4","45");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:30:00","16:10:00","4","46");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","16:10:00","4","47");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","17:50:00","20:10:00","4","48");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-18","12:50:00","15:10:00","4","49");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","12:50:00","15:10:00","4","50");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","15:30:00","18:00:00","4","51");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","12:50:00","15:10:00","4","52");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:50:00","15:10:00","4","53");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","15:30:00","18:00:00","4","54");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","10:50:00","13:10:00","4","55");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","14:00:00","16:10:00","4","56");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-20","13:50:00","16:00:00","4","57");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-21","12:30:00","16:10:00","4","58");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-21","12:50:00","16:10:00","4","59");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-22","17:50:00","20:10:00","4","60");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-27","12:50:00","15:10:00","4","61");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","12:50:00","15:10:00","4","62");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-19","15:30:00","18:00:00","4","63");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-17","12:50:00","15:10:00","4","64");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-16","15:30:00","18:00:00","4","65");

INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`)
VALUES("2023-02-22","10:50:00","13:10:00","4","65");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A1","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A2","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A3","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A4","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A5","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A6","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A7","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A8","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A9","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A10","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B1","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B2","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B3","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B4","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B5","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B6","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B7","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B8","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B9","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B10","1");


INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C1","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C2","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C3","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C4","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C5","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C6","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C7","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C8","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C9","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C10","1");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A1","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A2","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A3","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A4","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A5","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A6","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A7","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A8","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A9","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A10","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B1","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B2","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B3","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B4","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B5","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B6","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B7","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B8","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B9","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B10","2");


INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C1","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C2","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C3","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C4","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C5","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C6","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C7","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C8","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C9","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C10","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D1","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D2","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D3","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D4","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D5","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D6","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D7","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D8","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D9","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D10","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E1","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E2","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E3","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E4","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E5","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E6","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E7","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E8","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E9","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E10","2");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A1","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A2","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A3","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A4","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A5","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A6","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A7","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A8","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A9","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A10","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B1","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B2","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B3","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B4","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B5","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B6","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B7","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B8","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B9","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B10","3");


INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C1","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C2","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C3","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C4","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C5","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C6","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C7","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C8","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C9","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C10","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D1","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D2","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D3","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D4","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D5","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D6","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D7","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D8","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D9","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D10","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E1","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E2","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E3","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E4","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E5","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E6","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E7","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E8","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E9","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E10","3");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A1","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A2","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A3","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A4","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A5","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A6","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A7","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A8","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A9","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A10","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B1","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B2","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B3","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B4","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B5","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B6","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B7","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B8","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B9","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B10","4");


INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C1","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C2","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C3","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C4","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C5","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C6","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C7","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C8","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C9","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C10","4");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A1","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A2","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A3","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A4","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A5","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A6","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A7","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A8","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A9","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A10","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B1","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B2","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B3","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B4","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B5","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B6","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B7","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B8","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B9","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B10","5");


INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C1","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C2","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C3","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C4","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C5","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C6","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C7","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C8","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C9","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C10","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D1","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D2","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D3","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D4","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D5","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D6","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D7","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D8","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D9","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D10","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E1","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E2","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E3","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E4","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E5","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E6","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E7","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E8","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E9","5");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E10","5");


INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A1","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A2","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A3","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A4","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A5","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A6","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A7","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A8","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A9","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A10","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B1","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B2","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B3","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B4","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B5","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B6","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B7","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B8","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B9","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B10","6");


INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C1","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C2","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C3","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C4","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C5","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C6","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C7","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C8","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C9","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C10","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D1","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D2","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D3","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D4","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D5","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D6","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D7","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D8","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D9","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D10","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E1","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E2","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E3","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E4","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E5","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E6","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E7","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E8","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E9","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E10","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("F1","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("F2","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("F3","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("F4","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("F5","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("F6","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("F7","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("F8","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("F9","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("F10","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("G1","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("G2","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("G3","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("G4","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("G5","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("G6","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("G7","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("G8","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("G9","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("G10","6");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A1","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A2","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A3","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A4","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A5","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A6","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A7","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A8","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A9","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A10","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B1","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B2","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B3","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B4","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B5","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B6","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B7","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B8","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B9","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B10","7");


INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C1","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C2","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C3","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C4","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C5","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C6","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C7","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C8","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C9","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C10","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D1","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D2","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D3","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D4","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D5","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D6","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D7","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D8","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D9","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D10","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E1","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E2","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E3","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E4","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E5","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E6","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E7","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E8","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E9","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E10","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("F1","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("F2","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("F3","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("F4","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("F5","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("F6","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("F7","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("F8","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("F9","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("F10","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("G1","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("G2","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("G3","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("G4","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("G5","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("G6","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("G7","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("G8","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("G9","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("G10","7");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A1","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A2","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A3","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A4","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A5","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A6","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A7","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A8","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A9","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A10","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B1","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B2","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B3","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B4","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B5","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B6","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B7","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B8","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B9","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B10","8");


INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C1","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C2","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C3","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C4","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C5","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C6","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C7","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C8","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C9","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C10","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D1","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D2","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D3","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D4","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D5","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D6","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D7","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D8","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D9","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D10","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E1","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E2","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E3","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E4","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E5","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E6","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E7","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E8","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E9","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E10","8");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A1","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A2","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A3","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A4","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A5","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A6","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A7","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A8","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A9","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("A10","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B1","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B2","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B3","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B4","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B5","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B6","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B7","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B8","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B9","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("B10","9");


INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C1","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C2","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C3","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C4","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C5","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C6","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C7","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C8","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C9","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("C10","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D1","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D2","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D3","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D4","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D5","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D6","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D7","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D8","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D9","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("D10","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E1","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E2","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E3","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E4","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E5","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E6","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E7","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E8","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E9","9");

INSERT INTO `movie_seat`(`sname`,`cid`)
VALUES("E10","9");


-- 유령 회원을 가입시키는 프로시저
DELIMITER $$
CREATE PROCEDURE clone_member()
BEGIN
   DECLARE i INT DEFAULT 1; -- i변수 선언, defalt값 설정
   DECLARE val VARCHAR(20); -- 임시로 사용할 변수 선언
   WHILE (i <= 1500) DO -- for문 작성(i가 1500이 될 때까지 반복)
   	SET val = CONCAT("temp", i); -- temp와 i를 더해서 임시 아이디를 만듦
   	-- 멤버를 추가(비밀번호는 temp123456임)
      INSERT INTO `member` VALUE(val, '$2a$10$5Drrozm9Wdak6PLfZf34jui2tVdhuqNCN5DE7us41hVdbHk12Dfzy', '오병주', 'dhqudwn0@naver.com', '01012341234', '충남 당진시 합덕읍 감자마을1길 12 101', '1998-11-11', 'ROLE_USER');
      SET i = i + 1; -- i값에 1더해주고 WHILE문 처음으로 이동
    END WHILE;
END $$

-- 유령 회원을 통한 영화 좋아요 수 늘리는 프로시저(아바타)
-- 영화 종류와 필요한 인원수에 따라 변수만 변경 후 사용
DELIMITER $$
CREATE PROCEDURE clone_member_like1()
BEGIN
   DECLARE i INT DEFAULT 1; -- i변수 선언, defalt값 설정
   DECLARE val VARCHAR(20); -- 임시로 사용할 변수 선언
   WHILE (i <= 1500) DO -- for문 작성(필요한 좋아요 수 만큼 반복)
   	SET val = CONCAT("temp", i); -- temp와 i를 더해서 임시 아이디를 만듦
   	-- 유령계정의 이름으로 영화에 대한 좋아요와 평점 데이터를 추가
      INSERT INTO `movie_member`(`umlike`, `umscore`, `umcomment`, `umcommenttime`, `mid`, `uid`) VALUES(1, 9, "관람평을 위한 유령 관람평", NOW(), 1, val);
      SET i = i + 1; -- i값에 1더해주고 WHILE문 처음으로 이동
    END WHILE;
END $$

-- 유령 회원을 통한 영화 좋아요 수 늘리는 프로시저(슬램덩크)
-- 영화 종류와 필요한 인원수에 따라 변수만 변경 후 사용
DELIMITER $$
CREATE PROCEDURE clone_member_like2()
BEGIN
   DECLARE i INT DEFAULT 1; -- i변수 선언, defalt값 설정
   DECLARE val VARCHAR(20); -- 임시로 사용할 변수 선언
   WHILE (i <= 999) DO -- for문 작성(필요한 좋아요 수 만큼 반복)
   	SET val = CONCAT("temp", i); -- temp와 i를 더해서 임시 아이디를 만듦
   	-- 유령계정의 이름으로 영화에 대한 좋아요와 평점 데이터를 추가
      INSERT INTO `movie_member`(`umlike`, `umscore`, `umcomment`, `umcommenttime`, `mid`, `uid`) VALUES(1, 8, "관람평을 위한 유령 관람평", NOW(), 2, val);
      SET i = i + 1; -- i값에 1더해주고 WHILE문 처음으로 이동
    END WHILE;
END $$

-- 유령 회원을 통한 영화 좋아요 수 늘리는 프로시저(영웅)
-- 영화 종류와 필요한 인원수에 따라 변수만 변경 후 사용
DELIMITER $$
CREATE PROCEDURE clone_member_like3()
BEGIN
   DECLARE i INT DEFAULT 1; -- i변수 선언, defalt값 설정
   DECLARE val VARCHAR(20); -- 임시로 사용할 변수 선언
   WHILE (i <= 80) DO -- for문 작성(필요한 좋아요 수 만큼 반복)
   	SET val = CONCAT("temp", i); -- temp와 i를 더해서 임시 아이디를 만듦
   	-- 유령계정의 이름으로 영화에 대한 좋아요와 평점 데이터를 추가
      INSERT INTO `movie_member`(`umlike`, `umscore`, `umcomment`, `umcommenttime`, `mid`, `uid`) VALUES(1, 7, "관람평을 위한 유령 관람평", NOW(), 3, val);
      SET i = i + 1; -- i값에 1더해주고 WHILE문 처음으로 이동
    END WHILE;
END $$

-- 유령 회원을 통한 영화 좋아요 수 늘리는 프로시저(젠틀맨)
-- 영화 종류와 필요한 인원수에 따라 변수만 변경 후 사용
DELIMITER $$
CREATE PROCEDURE clone_member_like4()
BEGIN
   DECLARE i INT DEFAULT 1; -- i변수 선언, defalt값 설정
   DECLARE val VARCHAR(20); -- 임시로 사용할 변수 선언
   WHILE (i <= 30) DO -- for문 작성(필요한 좋아요 수 만큼 반복)
   	SET val = CONCAT("temp", i); -- temp와 i를 더해서 임시 아이디를 만듦
   	-- 유령계정의 이름으로 영화에 대한 좋아요와 평점 데이터를 추가
      INSERT INTO `movie_member`(`umlike`, `umscore`, `umcomment`, `umcommenttime`, `mid`, `uid`) VALUES(1, 6, "관람평을 위한 유령 관람평", NOW(), 4, val);
      SET i = i + 1; -- i값에 1더해주고 WHILE문 처음으로 이동
    END WHILE;
END $$

-- 유령 회원을 통한 영화 좋아요 수 늘리는 프로시저(젠틀맨)
-- 평점 소수점 생성을 위한 프로시저
DELIMITER $$
CREATE PROCEDURE clone_member_like5()
BEGIN
   DECLARE i INT DEFAULT 31; -- i변수 선언, defalt값 설정
   DECLARE val VARCHAR(31); -- 임시로 사용할 변수 선언
   WHILE (i <= 52) DO -- for문 작성(필요한 좋아요 수 만큼 반복)
   	SET val = CONCAT("temp", i); -- temp와 i를 더해서 임시 아이디를 만듦
   	-- 유령계정의 이름으로 영화에 대한 좋아요와 평점 데이터를 추가
      INSERT INTO `movie_member`(`umlike`, `umscore`, `umcomment`, `umcommenttime`, `mid`, `uid`) VALUES(1, 3, "관람평을 위한 유령 관람평", NOW(), 4, val);
      SET i = i + 1; -- i값에 1더해주고 WHILE문 처음으로 이동
    END WHILE;
END $$

-- 유령 회원 가입시키는 프로시저 실행
CALL clone_member();

-- 영화 좋아요를 늘리는 프로시저 실행(타이타닉)
CALL clone_member_like1();

-- 영화 좋아요를 늘리는 프로시저 실행(카운트)
CALL clone_member_like2();

-- 영화 좋아요를 늘리는 프로시저 실행(상견니)
CALL clone_member_like3();

-- 영화 좋아요를 늘리는 프로시저 실행(젠틀맨)
CALL clone_member_like4();

-- 영화 좋아요를 늘리는 프로시저 실행(젠틀맨)2
CALL clone_member_like5();

SELECT * FROM movie_member;