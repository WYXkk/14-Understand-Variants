var names = ['Tutorial','Reverse','Xor','Domino','Queen','Taiji','Mine',
	'Wavetapper','Luogu','Nice','Modulo','Time','Meta','Name'];

var subprocnt = [4,2,3,4,3,4,5,
	4,1,1,2,4,1,1];
var sizes = [
	[[1,1], [1,1], [1,3], [4,4]], 
	[[1,3], [4,4]],
	[[3,4], [3,3], [7,7]],
	[[3,5], [2,2], [3,3], [3,6]],
	[[4,4], [5,5], [8,8]],
	[[2,3], [2,3], [2,4], [5,5]],
	[[1,2], [1,3], [2,2], [2,3], [5,4]],
	[[1,11],[1,11],[1,12],[1,29]],
	[[5,3]],
	[[1,8]],
	[[8,9],[9,9]],
	[[2,6],[4,8],[4,6],[6,10]],
	[[5,19]],
	[[2,7]]
];
var lightcount = [2,2,4,3,4,3,4,
	1,1,1,1,1,2,1];
var texts = [
	[//1.Tutorial
		['o'],
		['x'],
		['o.x'],
		['..ox','xo..','x.o.','.o.x']
	],[//2.Reverse
		['o.x'],
		['..ox','xo..','x.o.','.o.x']
	],[//3.Xor
		['ooxx','oxox','xo.x'],
		['o.x','.x.','xo.'],
		['xxo..x.','.xoox.x','xoo.oox','.o.oo.o','oo....o','x.xoxxx','x..xx.o']
	],[//4.Domino
		['ooxo.','xxxxx','.ox..'],
		['o.','..'],
		['...','...','...'],
		['o...o.','..o...','..x..o']
	],[//5.Queen
		['.o..','...o','o...','..o.'],
		['.o...','.....','.....','.....','...o.'],
		['o.......','........','........','........','........','........','........','........']	
	],[//6.Taiji
		['o.o','.o.'],
		['.x.','x.x'],
		['.ox.','o..x'],
		['.oox.','oo.xx','x...x','xx.oo','.xoo.']
	],[//7.Mine
		['1.'],
		['.2.'],
		['3.','..'],
		['...','121'],
		['.2..','.3.2','1..3','.1..','..2.']
	],[//8.Wavetapper
		['72786326464'],
		['72783335464'],
		['727852648243'],
		['72788433374733678633778263464']
	],[//9.Luogu
		['xxo','xox','oxo','xox','oxo']
	],[//10.Nice
		[['128','64','32','16','8','4','2','1']]
	],[//11.Modulo
		['1........',
		 '9........',
		 '4........',
		 '9........',
		 '1........',
		 '0........',
		 '0........',
		 '1........',
		],
		['9........',
		 '9........',
		 '8........',
		 '2........',
		 '4........',
		 '4........',
		 '3........',
		 '5........',
		 '3........'
		]
	],[//12.Time
		['mon...','......'],
		['d.......','........','........','........'],
		['......','......','......','......'],
		['..........','..........','..........','..........','..........','..........']
	],[//13.Meta
		['oxxxoxoxxoooxxoooxx','ooxxoxxxoxxxxoxxxox','oxoxoxoxoxxxxooooox','oxxooxoxoxxxxoxxxxx','oxxxoxoxxoooxxoooxo']
	],[//14.Name
		['0000000','0000000']
	]
]

getText=(i,j,p,q)=>{
	if(i==12||i==8) return '?';
	if(i==13){
		if(q>=[4,0][p]) return '?';
	}
	if(i==7) {
		if(q>=[11,7,3,1][j]) return '?';
	}
	if(i==10) {
		if(j==1&&p>=3&&q==0) return '?';
	}
	if(texts[i][j][p][q]=='.') return '';
	else return texts[i][j][p][q];
}

function generateElements(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.children[0];
}

//prework for 14
(()=>{
	texts[13][0][0]='',texts[13][0][1]='';
	for(var i=0;i<7;i++){
		texts[13][0][0]+=(names[i].length%10);
		texts[13][0][1]+=(names[i+7].length%10);
	}})();


var problems;
generategrid=()=>{
	var buttons=document.getElementById('buttons');
	for(var i=0;i<14;++i){
		buttons.append(generateElements('<button onclick="changeproblem('+i+')">'+(i+1)+'.'+names[i]+'</button>'));
		if(i==6) buttons.append(document.createElement('br'));
	}

	problems=document.getElementById('problems');
	for(var i=0;i<14;++i){
		problems.append(generateElements('<div style="display:none"></div>'));var nowproblem=problems.children[i];
		nowproblem.append(document.createElement('div'));var buttonpart=nowproblem.children[0];
		buttonpart.append(generateElements('<p>您正在查看 '+(i+1)+'.'+names[i]+'</p>'));
		for(var j=0;j<subprocnt[i];j++){
			buttonpart.append(generateElements('<button onclick="changesubproblem('+i+','+j+')">'
				+(j==subprocnt[i]-1?('最终题版'):('小题版#'+(j+1)))+'</button>'))
		}
		for(var j=0;j<subprocnt[i];j++){
			nowproblem.append(generateElements('<div'+(j==0?'':' style="display:none"')+'></div>'));var nowsubproblem=nowproblem.children[j+1];
			var n=sizes[i][j][0],m=sizes[i][j][1];
			for(var p=0;p<n;++p){
				nowsubproblem.append(document.createElement('div'));
				for(var q=0;q<m;++q) nowsubproblem.children[p].append(generateElements('<button class="offbutton" onclick="changeblock('+i+','+j+','+p+','+q+')">'+getText(i,j,p,q)+'</button>'));
					nowsubproblem.children[p].append(document.createElement('br'));
			}
			nowsubproblem.append(document.createElement('br'));
			nowsubproblem.append(document.createElement('div'));var lights=nowsubproblem.children[nowsubproblem.childElementCount-1];
			for(var p=0;p<lightcount[i];p++){
				lights.append(generateElements('<button class="offlight"></button>'));
			}
		}
	}
}
generategrid();
function changeproblem(id){
	if(names[id]=='Placeholder') return;
	for(var i=0;i<14;++i) problems.children[i].style.display="none";
	problems.children[id].style.display="";
}
changeproblem(0);
function changesubproblem(id,idd){
	if(names[id]=='Placeholder') return;
	for(var i=0;i<subprocnt[id];++i) problems.children[id].children[i+1].style.display="none";
	problems.children[id].children[idd+1].style.display="";
}
changesubproblem(0,0);
function changeblock(i,j,p,q){
	player[i][j][p][q]^=1;
	if(player[i][j][p][q]) problems.children[i].children[j+1].children[p].children[q].classList=["onbutton"];
	else problems.children[i].children[j+1].children[p].children[q].classList=["offbutton"];
	save();check(i,j);
}


var player;
load=()=>{
	player=JSON.parse(localStorage.getItem('14uv_save'));
	for(var i=0;i<14;++i) for(var j=0;j<subprocnt[i];j++)
	{
		var n=sizes[i][j][0],m=sizes[i][j][1];
		for(var p=0;p<n;++p) for(var q=0;q<m;++q)
		{
			if(player[i][j][p][q]) problems.children[i].children[j+1].children[p].children[q].classList=["onbutton"];
			else problems.children[i].children[j+1].children[p].children[q].classList=["offbutton"];
		}
	}
	for(var i=0;i<14;++i) for(var j=0;j<subprocnt[i];j++) check(i,j);
}
save=()=>{localStorage.setItem('14uv_save',JSON.stringify(player));}
make_list=(val,n)=>{var x=[];for(var t=1;t<=n;t++)x.push(val);return x;}
make_list2=(val,n)=>{var x=[];for(var t=1;t<=n;t++)x.push([].concat(val));return x;}
newsave=()=>{
	player=[];
	for(var i=0;i<14;++i) {
		var p=[];
		for(var j=0;j<subprocnt[i];++j) p.push(make_list2(make_list(0,sizes[i][j][1]),sizes[i][j][0]));
		player.push(p);
	}
	save();load();
}

check=(i,j)=>{
	var x=check2(i,player[i][j],texts[i][j],sizes[i][j][0],sizes[i][j][1]);
	var sub=problems.children[i].children[j+1];var lights=sub.children[sub.childElementCount-1];
	for(var p=0;p<lightcount[i];p++){
		lights.children[p].classList=[x[p]?'onlight':'offlight'];
	}
}

check2=(i,pl,tx,n,m)=>{
	if(i==0||i==12)
	{
		var x=[true,true];
		for(var p=0;p<n;p++) for(var q=0;q<m;q++){
			if(tx[p][q]=='o'&&pl[p][q]==0) x[0]=false;
			if(tx[p][q]=='x'&&pl[p][q]==1) x[1]=false;
		}
		return x;
	}
	if(i==1)
	{
		var x=[true,true];
		for(var p=0;p<n;p++) for(var q=0;q<m;q++){
			if(tx[p][q]=='o'&&pl[p][q]==1) x[0]=false;
			if(tx[p][q]=='x'&&pl[p][q]==0) x[1]=false;
		}
		return x;
	}
	if(i==2)
	{
		var x=[true,true,true,true];
		for(var p=0;p<n;p++) for(var q=0;q<m;q++){
			if(tx[p][q]=='o'&&pl[p][q]==0) x[0]=false;
			if(tx[p][q]=='x'&&pl[p][q]==1) x[1]=false;
		}
		for(var p=0;p<n;p++){
			var tot=0;
			for(var q=0;q<m;q++) tot^=pl[p][q];
			if(tot) x[3]=false;
		}
		for(var q=0;q<m;q++) {
			var tot=0;
			for(var p=0;p<n;p++)tot^=pl[p][q];
			if(tot) x[3]=false;
		}
		return x;
	}
	if(i==3)
	{
		var x=[true,true,true];
		for(var p=0;p<n;p++) for(var q=0;q<m;q++){
			if(tx[p][q]=='o'&&pl[p][q]==0) x[0]=false;
			if(tx[p][q]=='x'&&pl[p][q]==1) x[1]=false;
		}
		for(var p=0;p<n;p++) for(var q=0;q<m;q++) if(pl[p][q]==1) {
			var neb=0;
			if(p>0) neb+=pl[p-1][q];
			if(q>0) neb+=pl[p][q-1];
			if(p+1<n) neb+=pl[p+1][q];
			if(q+1<m) neb+=pl[p][q+1];
			if(neb!=1) x[2]=false;
		}
		return x;
	}
	if(i==4)
	{
		var x=[true,true,true,true];
		for(var p=0;p<n;p++) for(var q=0;q<m;q++){
			if(tx[p][q]=='o'&&pl[p][q]==0) x[0]=false;
			if(tx[p][q]=='x'&&pl[p][q]==1) x[1]=false;
		}
		var tot=0;
		for(var p=0;p<n;p++) for(var q=0;q<m;q++) if(pl[p][q]==1){
			tot+=1;
			var dx=[1,-1,0,0,-1,-1,1,1];
			var dy=[0,0,1,-1,1,-1,1,-1];
			for(var w=0;w<8;w++){
				var dxx=dx[w],dyy=dy[w],pp=p+dxx,qq=q+dyy;
				while(pp>=0&&pp<n&&qq>=0&&qq<m){
					if(pl[pp][qq]) x[2]=false;
					pp+=dxx;qq+=dyy;
				}
			}
		}
		if(tot!=n) x[3]=false;
		return x;
	}
	if(i==7||i==13){
		var x=[true];
		for(var p=0;p<n;p++) for(var q=0;q<m;q++){
			if(JSON.parse(tx[p][q])%2==1&&pl[p][q]==0) x[0]=false;
			if(JSON.parse(tx[p][q])%2==0&&pl[p][q]==1) x[0]=false;
		}
		return x;
	}
	if(i==5){
		var x=[true,true,true];
		for(var p=0;p<n;p++) for(var q=0;q<m;q++){
			if(tx[p][q]=='o'&&pl[p][q]==0) x[0]=false;
			if(tx[p][q]=='x'&&pl[p][q]==1) x[1]=false;
			if(tx[p][q]=='.'){
				var neb1=0,neb0=0;
				if(p>0) {if(pl[p-1][q]) neb1++;else neb0++;if(tx[p-1][q]=='o') neb1+=10;if(tx[p-1][q]=='x') neb0+=10;}
				if(q>0) {if(pl[p][q-1]) neb1++;else neb0++;if(tx[p][q-1]=='o') neb1+=10;if(tx[p][q-1]=='x') neb0+=10;}
				if(p+1<n) {if(pl[p+1][q]) neb1++;else neb0++;if(tx[p+1][q]=='o') neb1+=10;if(tx[p+1][q]=='x') neb0+=10;}
				if(q+1<m) {if(pl[p][q+1]) neb1++;else neb0++;if(tx[p][q+1]=='o') neb1+=10;if(tx[p][q+1]=='x') neb0+=10;}
				if(pl[p][q]==1&&neb1>neb0) x[2]=false;
				if(pl[p][q]==0&&neb0>neb1) x[2]=false;
			}
		}
		return x;
	}
	if(i==6){
		var x=[true,true,true,true];
		for(var p=0;p<n;p++) for(var q=0;q<m;q++){
			if(tx[p][q]!='.'){
				if(pl[p][q]==1) x[0]=false;
				var dx=[1,-1,0,0,-1,-1,1,1];
				var dy=[0,0,1,-1,1,-1,1,-1];
				var cnt=0;
				for(var w=0;w<8;w++){
					var dxx=dx[w],dyy=dy[w],pp=p+dxx,qq=q+dyy;
					if(pp>=0&&pp<n&&qq>=0&&qq<m) cnt+=pl[pp][qq];
				}
				if(JSON.parse(tx[p][q])!=cnt) x[JSON.parse(tx[p][q])]=false;
			}
		}
		return x;
	}
	if(i==8)
	{
		var x=[true];
		for(var p=0;p<n;p++) for(var q=0;q<m;q++){
			if(tx[p][q]=='o'&&pl[p][q]==0) x[0]=false;
			if(tx[p][q]=='x'&&pl[p][q]==1) x[0]=false;
		}
		return x;
	}
	if(i==11)
	{
		var x=[true];
		var cnt=0;for(var p=0;p<n;p++) for(var q=0;q<m;q++) cnt+=pl[p][q];
		let date = new Date();
		if(tx[0][0]=='m') x[0]=(date.getMonth()+1==cnt);
		if(tx[0][0]=='d') x[0]=(date.getDate()==cnt);
		if(tx[0][0]=='.'&&n*m==24) x[0]=(date.getHours()==cnt);
		if(tx[0][0]=='.'&&n*m==60) x[0]=(date.getMinutes()==cnt);
		return x;
	}
	if(i==9)
	{
		var x=[true];
		var ans=[0,1,0,0,0,1,0,1];
		for(var p=0;p<n;p++) for(var q=0;q<m;q++) {
			if(ans[q]!=pl[p][q]) x[0]=false;;
		}
		return x;
	}
	if(i==10)
	{
		var x=[true];
		for(var p=0;p<n;p++){
			var cnt=0;var tot=JSON.parse(tx[p][0]);
			for(var q=0;q<m;q++) {
				if(pl[p][q]) ++cnt;
			}
			if(cnt!=tot) x[0]=false;
		} 
		return x;
	}
	return [false,false,false,false,false,false];
}

//prework of pro 13
pre13=()=>{
	var pro13=problems.children[12].children[1];var light13=pro13.children[pro13.childElementCount-1];
	light13.children[0].onclick=()=>{
		for(var p=0;p<5;p++) for(var q=0;q<19;q++) if(texts[12][0][p][q]=='o'){
			if(light13.children[0].classList[0]=='offlight') player[12][0][p][q]=1;
			else player[12][0][p][q]=0;
		}
		check(12,0);save();load();
	}
	light13.children[0].innerHTML='6';
	light13.children[1].onclick=()=>{
		for(var p=0;p<5;p++) for(var q=0;q<19;q++) if(texts[12][0][p][q]=='x'){
			if(light13.children[1].classList[0]=='offlight') player[12][0][p][q]=0;
			else player[12][0][p][q]=1;
		}
		check(12,0);save();load();
	}
	light13.children[1].innerHTML='9';
}
pre13();

if(localStorage.getItem('14uv_save')!=null) load();
else newsave();

setInterval(()=>{check(11,2);check(11,3);},1000);

function generateCode(){
	var code="#include<iostream>\nusing namespace std;\nint main()\n{\n\tint n;cin>>n;";
	for(var i=0;i<14;i++){
		code+="\n\tif(n=="+(i+1)+")\n\t{";
		var j=subprocnt[i]-1;
		var n=sizes[i][j][0],m=sizes[i][j][1];
		for(var p=0;p<n;++p){
			code+="\n\t\tcout<<\"";
			for(var q=0;q<m;++q){
				code+=player[i][j][p][q];
				if(q!=m-1) code+=' ';
			}
			code+="\"<<endl;"
		}
		if(i==6) code+="\n\t\tcerr<<\"U 1 1 3\"<<endl;\n\t\tcerr<<\"  7 2 5\"<<endl;"
		code+="\n\t}";
	}
	code+="\n\treturn 0;\n}";
	document.getElementById('code').value=code;
}