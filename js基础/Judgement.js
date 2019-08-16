// js 中一些判断处理的几种写法

/* 一元判断 */
// 1、if /else
const onButtonClick = (state) =>{
  if(state == 1){
    sendLog('processing');
    jumpTo('IndexPage');
  }else if(state == 2||state == 3){
    sendLog('fail');
    jumpTo('FailPage');
  }else if(state == 4){
    sendLog('success');
    jumpTo('SuccessPage');
  }else if(state == 5){
    sendLog('cancel');
    jumpTo('CancelPage')
  }else{
    sendLog('other');
    jumpTo('Index');
  }
}

// 2、 switch
const onButtonClick = state =>{
  switch(state){
    case 1:
      sendLog('processing');
      jumpTo('IndexPage');
      break;
    case 2:
    case 3:
      sendLog('fail');
      jumpTo('FailPage');
      break;
    case 4:
      sendLog('success');
      jumpTo('SuccessPage');
      break;
    case 5:
      sendLog('cancel');
      jumpTo('CancelPage');
      break;
    default 6:
      sendLog('cancel');
      jumpTo('CancelPage');
      break;
}

//3、Object处理
const actions = {
  '1':['processing','IndexPage'],
  '2':['fail','FailPage'],
  '3':['fail','FailPage'],
  '4':['success','SuccessPage'],
  '5':['cancel','CancelPage'],
  'default':['other','Index']
}

const onButtonClick = state =>{
  let action = actions[state],
      logName = action[0],
      pageName = action[1];
  sendLog(logName);
  jumpTo(pageName);
}

//4、 Map 处理
const actions = new Map([
  [1,['processing','IndexPage']],
  [2,['fail','FailPage']],
  [3,['fail','FailPage']],
  [4,['success','SuccessPage']],
  [5,['cancel','CancelPage']],
  ['default',['other','Index']]
])

const onButtonClick = state =>{
  let action = actions.get(state);
  sendLog(action[0]);
  jumpTo(action[1]);
}

/* 二元判断 */

//5 、 Map 
const actions = new Map([
  ['guest_1', ()=>{}],
  ['guest_2', ()=>{}],
  ['guest_3', ()=>{}],
  ['guest_4', ()=>{}],
  ['guest_5', ()=>{}],
  ['master_1', ()=>{}],
  ['master_2', ()=>{}],
  ['master_3', ()=>{}],
  ['master_4', ()=>{}],
  ['master_5', ()=>{}],
  ['default', ()=>{}],
])

/**
 * 按钮点击事件
 * @param {string} identity 身份标识：guest客态 master主态
 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 开团成功 4 商品售罄 5 有库存未开团
 */
const onButtonClick = (identity,status)=>{
  let action = actions.get(`${identity}_${status}`) || actions.get('default')
  action.call(this)
}

// 6、Object
const actions = {
  'guest_1':()=>{},
  'guest_2':()=>{},
  //....
}

const onButtonClick = (identity,status)=>{
  let action = actions[`${identity}_${status}`] || actions['default']
  action.call(this)
}
