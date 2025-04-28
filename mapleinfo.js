const bot = BotManager.getCurrentBot();


aa;
importClass(org.jsoup.Jsoup);

apikey = "";

function ocidapi(name,server){
   ocidUrl = 'https://open.api.nexon.com/maplestorym/v1/id?character_name='+name+'&world_name='+server;
   
   try{
     ocid_response = Jsoup.connect(ocidUrl)
        .ignoreContentType(true)
        .header("accept", "application/json")
        .header("x-nxopen-api-key", apikey)
        .execute().body();

      const ocid_obj = JSON.parse(ocid_response);
      
      return ocid_obj.ocid;

   }catch(HttpStatusException){
    return null;
   }
  
  
}

function characterapi(ocid){ 
  characterUrl = 'https://open.api.nexon.com/maplestorym/v1/character/basic?ocid='+ocid;
   let character_response = Jsoup.connect(characterUrl)
   .ignoreContentType(true)
        .header("accept", "application/json")
        .header("x-nxopen-api-key", apikey)
        .execute().body();

  const character_obj = JSON.parse(character_response);


  return character_obj;
}

function statapi(ocid){ 
  statUrl = 'https://open.api.nexon.com/maplestorym/v1/character/stat?ocid='+ocid;
   let stat_response = Jsoup.connect(statUrl)
   .ignoreContentType(true)
        .header("accept", "application/json")
        .header("x-nxopen-api-key", apikey)
        .execute().body();

  const stat_obj = JSON.parse(stat_response);


  return stat_obj.stat;
}

function guildapi(ocid){ 
  guildUrl = 'https://open.api.nexon.com/maplestorym/v1/character/guild?ocid='+ocid;
   let guild_response = Jsoup.connect(guildUrl)
   .ignoreContentType(true)
        .header("accept", "application/json")
        .header("x-nxopen-api-key", apikey)
        .execute().body();

  const guild_obj = JSON.parse(guild_response);


  return guild_obj.guild_name;
}

function itemapi(ocid){ 
  itemUrl = 'https://open.api.nexon.com/maplestorym/v1/character/item-equipment?ocid='+ocid;
   let item_response = Jsoup.connect(itemUrl)
   .ignoreContentType(true)
        .header("accept", "application/json")
        .header("x-nxopen-api-key", apikey)
        .execute().body();

  const item_obj = JSON.parse(item_response);


  return item_obj.item_equipment;
}

function vmatrixapi(ocid){ 
  itemUrl = 'https://open.api.nexon.com/maplestorym/v1/character/vmatrix?ocid='+ocid;
   let item_response = Jsoup.connect(itemUrl)
   .ignoreContentType(true)
        .header("accept", "application/json")
        .header("x-nxopen-api-key", apikey)
        .execute().body();

  const item_obj = JSON.parse(item_response);

  return item_obj.character_v_core_equipment;
}

function beautyapi(ocid){ 
  itemUrl = 'https://open.api.nexon.com/maplestorym/v1/character/beauty-equipment?ocid='+ocid;
   let item_response = Jsoup.connect(itemUrl)
   .ignoreContentType(true)
        .header("accept", "application/json")
        .header("x-nxopen-api-key", apikey)
        .execute().body();

  const item_obj = JSON.parse(item_response);
  
  return item_obj;
}

function convertToKoreanDate(isoString) {
  // ISO 8601 날짜 문자열을 Date 객체로 변환
  const fixedIsoString = isoString.replace(/(\.\d{2})Z$/, '$10Z');
  const date = new Date(fixedIsoString);
  
  // 각 구성 요소 추출
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // 한국어 형식의 날짜 문자열 생성
  return year+'년 '+month+'월 '+day+'일 '+hours+':'+minutes+':'+seconds;
}

function convertstr(str) {

  if(str!=null){
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }else{
    return "-"
  }
}

/**
 * (string) msg.content: 메시지의 내용
 * (string) msg.room: 메시지를 받은 방 이름
 * (User) msg.author: 메시지 전송자
 * (string) msg.author.name: 메시지 전송자 이름
 * (Image) msg.author.avatar: 메시지 전송자 프로필 사진
 * (string) msg.author.avatar.getBase64()
 * (string | null) msg.author.userHash: 사용자의 고유 id
 * (boolean) msg.isGroupChat: 단체/오픈채팅 여부
 * (boolean) msg.isDebugRoom: 디버그룸에서 받은 메시지일 시 true
 * (string) msg.packageName: 메시지를 받은 메신저의 패키지명
 * (void) msg.reply(string): 답장하기
 * (boolean) msg.isMention: 메세지 맨션 포함 여부
 * (bigint) msg.logId: 각 메세지의 고유 id
 * (bigint) msg.channelId: 각 방의 고유 id
 */
 



function onMessage(msg) {

}
bot.addListener(Event.MESSAGE, onMessage);


/**
 * (string) msg.content: 메시지의 내용
 * (string) msg.room: 메시지를 받은 방 이름
 * (User) msg.author: 메시지 전송자
 * (string) msg.author.name: 메시지 전송자 이름
 * (Image) msg.author.avatar: 메시지 전송자 프로필 사진
 * (string) msg.author.avatar.getBase64()
 * (boolean) msg.isDebugRoom: 디버그룸에서 받은 메시지일 시 true
 * (boolean) msg.isGroupChat: 단체/오픈채팅 여부
 * (string) msg.packageName: 메시지를 받은 메신저의 패키지명
 * (void) msg.reply(string): 답장하기
 * (string) msg.command: 명령어 이름
 * (Array) msg.args: 명령어 인자 배열
 */
function onCommand(msg) {
  if(msg.command=="캐릭터정보"){

    switch(msg.args[0]){
      case '아케인':
        server = '아케인'
        nickname = msg.args[1];
        break;
      case '크로아':
        server = '크로아'
        nickname = msg.args[1];
        break;
      case '엘리시움':
        server = '엘리시움'
        nickname = msg.args[1];
        break;
      case '루나':
        server = '루나'
        nickname = msg.args[1];
        break;
      case '유니온':
        server = '유니온'
        nickname = msg.args[1];
        break;
      case '제니스':
        server = '제니스'
        nickname = msg.args[1];
        break;
      default:
        server = '스카니아'
        nickname = msg.args[0];
    }
    //nickname = msg.args[1];
    result_ocid =ocidapi(nickname,server);
    if(result_ocid==null){
    msg.reply("["+nickname+"]캐릭터 정보가 없습니다.");
    }else{
    result_character =characterapi(result_ocid);
    result_stat = statapi(result_ocid);
    result_guild = guildapi(result_ocid);
   
    msg.reply("["+result_character.world_name+"]"+result_character.character_name+"\n레벨 : "+result_character.character_level+"\n경험치 : "+convertstr(result_character.character_exp)+"\n직업 : "+result_character.character_job_name+"\n전투력 : "+convertstr(result_stat[0].stat_value)+"\n물리공격력 : "+convertstr(result_stat[1].stat_value)+"\n마법공격력 : "+convertstr(result_stat[2].stat_value)+"\nHP : "+convertstr(result_stat[3].stat_value)+"\n길드 : "+convertstr(result_guild));
    }

   }
  

  if(msg.command=="코디정보"){

    switch(msg.args[0]){
      case '아케인':
        server = '아케인'
        nickname = msg.args[1];
        break;
      case '크로아':
        server = '크로아'
        nickname = msg.args[1];
        break;
      case '엘리시움':
        server = '엘리시움'
        nickname = msg.args[1];
        break;
      case '루나':
        server = '루나'
        nickname = msg.args[1];
        break;
      case '유니온':
        server = '유니온'
        nickname = msg.args[1];
        break;
      case '제니스':
        server = '제니스'
        nickname = msg.args[1];
        break;
      default:
        server = '스카니아'
        nickname = msg.args[0];
    }
    //nickname = msg.args[1];
    result_ocid =ocidapi(nickname,server);
   
    if(result_ocid==null){
      msg.reply("["+nickname+"]캐릭터 정보가 없습니다.");
      }else{
      result_item = itemapi(result_ocid);
      var item_obj = new Object();
      for(i=0; i < Object.keys(result_item).length; i++){
        
        if(result_item[i].item_equipment_slot_name==null){
          
        }else{
          if(result_item[i].item_equipment_slot_name.includes('안드로이드')){

          }else{
            item_obj[result_item[i].item_equipment_page_name] = result_item[i].item_name;
          }

        };
       
      }

      if(item_obj["LongCoat_Cash 한벌옷"]==undefined){
        msg.reply("["+nickname+"] 착용 코디 정보\n무기 : "+item_obj["Weapon_Cash 무기"]+"\n모자 : "+item_obj["Cap_Cash 모자"]+"\n상의 : "+item_obj["Clothes_Cash 상의"]+"\n하의 : "+item_obj["Pants_Cash 하의"]+"\n장갑 : "+item_obj["Gloves_Cash 장갑"]+"\n신발 : "+item_obj["Shoes_Cash 신발"]+"\n망토 : "+item_obj["Cape_Cash 망토"]+"\n의자 : "+item_obj["Chair 의자"]+"\n라이딩 : "+item_obj["Vehicle 탈것"]);
      }else{
      msg.reply("["+nickname+"] 착용 코디 정보\n무기 : "+item_obj["Weapon_Cash 무기"]+"\n모자 : "+item_obj["Cap_Cash 모자"]+"\n한벌옷 : "+item_obj["LongCoat_Cash 한벌옷"]+"\n장갑 : "+item_obj["Gloves_Cash 장갑"]+"\n신발 : "+item_obj["Shoes_Cash 신발"]+"\n망토 : "+item_obj["Cape_Cash 망토"]+"\n의자 : "+item_obj["Chair 의자"]+"\n라이딩 : "+item_obj["Vehicle 탈것"]);
      }
    }
    
  
    
/* 
    무기 Weapon_Cash 무기
    모자 Cap_Cash 모자
    상의 Clothes_cash 상의
    하의 Pants_cash 하의
    한벌옷 LongCoat_Cash 한벌옷
    장갑  Gloves_Cash 장갑
    신발  Shoes_Cash 신발
    귀고리 EarAcc_Cash 귀고리
    얼굴장식 Forehead_Cash 얼굴장식
    눈장식 EyeAcc_Cash 눈장식
    망토 Cape_Cash 망토
    이펙트 Effect 이펙트
    의자 Chair 의자
    라이딩 Vehicle 탈것  */
  }

  if(msg.command=="접속기록"){

    switch(msg.args[0]){
      case '아케인':
        server = '아케인'
        nickname = msg.args[1];
        break;
      case '크로아':
        server = '크로아'
        nickname = msg.args[1];
        break;
      case '엘리시움':
        server = '엘리시움'
        nickname = msg.args[1];
        break;
      case '루나':
        server = '루나'
        nickname = msg.args[1];
        break;
      case '유니온':
        server = '유니온'
        nickname = msg.args[1];
        break;
      case '제니스':
        server = '제니스'
        nickname = msg.args[1];
        break;
      default:
        server = '스카니아'
        nickname = msg.args[0];
    }
    //nickname = msg.split(',')[1];
    result_ocid =ocidapi(nickname,server);
    if(result_ocid==null){
    msg.reply("["+nickname+"]캐릭터 정보가 없습니다.");
    }else{
    result_character =characterapi(result_ocid);

    //캐릭터 생성일
    if(result_character.character_date_create ==null){
      character_date_create = "정보가 없습니다."
    }else{
      character_date_create = convertToKoreanDate(result_character.character_date_create); 
    }

    //최근접속
    if(result_character.character_date_last_login==null){
      character_date_last_login = "정보가 없습니다."
    }else{
      character_date_last_login = convertToKoreanDate(result_character.character_date_last_login);
    }
    
    //최근로그아웃
    if(result_character.character_date_last_logout==null){
      character_date_last_logout = "정보가 없습니다."
    }else{
      character_date_last_logout = convertToKoreanDate(result_character.character_date_last_logout);
    }
    
    
    
    msg.reply("["+result_character.world_name+"]"+result_character.character_name+"\n캐릭터 생성일 : "+character_date_create+"\n최근접속 : "+character_date_last_login+"\n최근접종 : "+character_date_last_logout);
    //msg.reply(result_character.character_date_create);
  }
  }

  if(msg.command=="매트릭스"){

    switch(msg.args[0]){
      case '아케인':
        server = '아케인'
        nickname = msg.args[1];
        break;
      case '크로아':
        server = '크로아'
        nickname = msg.args[1];
        break;
      case '엘리시움':
        server = '엘리시움'
        nickname = msg.args[1];
        break;
      case '루나':
        server = '루나'
        nickname = msg.args[1];
        break;
      case '유니온':
        server = '유니온'
        nickname = msg.args[1];
        break;
      case '제니스':
        server = '제니스'
        nickname = msg.args[1];
        break;
      default:
        server = '스카니아'
        nickname = msg.args[0];
    }
    //nickname = msg.split(',')[1];
    result_ocid =ocidapi(nickname,server);
   
    if(result_ocid==null){
      msg.reply("["+nickname+"]캐릭터 정보가 없습니다.");
      }else{
      result_item = vmatrixapi(result_ocid);
      var item_obj = new Object();
      for(i=0; i < Object.keys(result_item).length; i++){
        item_obj[result_item[i].slot_id] = [result_item[i].v_core_name, result_item[i].slot_level, result_item[i].v_core_level];
        };
       
      }

    result_text = "["+nickname+"] V매트릭스"
    for(i=0; i < Object.keys(item_obj).length; i++){
      result_text+="\n"+Object.keys(item_obj)[i]+" : "+item_obj[Object.keys(item_obj)[i]][0]+" ⟡ "+item_obj[Object.keys(item_obj)[i]][2]+"+"+item_obj[Object.keys(item_obj)[i]][1];
    }
    msg.reply(result_text);
   }

   if(msg.command=="뷰티정보"){

    switch(msg.args[0]){
      case '아케인':
        server = '아케인'
        nickname = msg.args[1];
        break;
      case '크로아':
        server = '크로아'
        nickname = msg.args[1];
        break;
      case '엘리시움':
        server = '엘리시움'
        nickname = msg.args[1];
        break;
      case '루나':
        server = '루나'
        nickname = msg.args[1];
        break;
      case '유니온':
        server = '유니온'
        nickname = msg.args[1];
        break;
      case '제니스':
        server = '제니스'
        nickname = msg.args[1];
        break;
      default:
        server = '스카니아'
        nickname = msg.args[0];
    }
    //nickname = msg.split(',')[1];
    result_ocid =ocidapi(nickname,server);
   
    if(result_ocid==null){
      msg.reply("["+nickname+"]캐릭터 정보가 없습니다.");
      }
      else{
      result_item = beautyapi(result_ocid);

      if(result_item.character_class==null){
        msg.reply('캐릭터 1회이상 접속 후 조회 부탁드립니다.');
      }else{
        result_text = "["+nickname+"] 뷰티정보\n헤어 : "+result_item.character_hair.hair_name;
        //헤어입력
        if(result_item.character_hair.mix_color==null){
          result_text+="\n["+result_item.character_hair.base_color+" 100]"
        }else{
          result_text+="\n["+result_item.character_hair.base_color+" "+(100-Number(result_item.character_hair.mix_rate))+" : "+result_item.character_hair.mix_rate+" "+result_item.character_hair.mix_color+"]"
        }

        //성형입력
        result_text += "\n성형 : "+result_item.character_face.face_name;
        if(result_item.character_face.mix_color==null){
          result_text+="\n["+result_item.character_face.base_color+" 100]";
        }else{
          result_text+="\n["+result_item.character_face.base_color+" "+(100-Number(result_item.character_face.mix_rate))+" : "+result_item.character_face.mix_rate+" "+result_item.character_face.mix_color+"]"
        }
        
        //피부입력
        result_text +="\n피부 : "+ result_item.character_skin_name;

      msg.reply(result_text);
      }
    }
  }
  
}
bot.setCommandPrefix(""); //@로 시작하는 메시지를 command로 판단
bot.addListener(Event.COMMAND, onCommand);


function onCreate(savedInstanceState, activity) {
  var textView = new android.widget.TextView(activity);
  textView.setText("Hello, World!");
  textView.setTextColor(android.graphics.Color.DKGRAY);
  activity.setContentView(textView);
}

function onStart(activity) {}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}

function onRestart(activity) {}

function onDestroy(activity) {}

function onBackPressed(activity) {}

bot.addListener(Event.Activity.CREATE, onCreate);
bot.addListener(Event.Activity.START, onStart);
bot.addListener(Event.Activity.RESUME, onResume);
bot.addListener(Event.Activity.PAUSE, onPause);
bot.addListener(Event.Activity.STOP, onStop);
bot.addListener(Event.Activity.RESTART, onRestart);
bot.addListener(Event.Activity.DESTROY, onDestroy);
bot.addListener(Event.Activity.BACK_PRESSED, onBackPressed);