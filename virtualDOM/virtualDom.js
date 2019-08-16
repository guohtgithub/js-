var elem = {
  tagName:'ul',
  props:{
    id:'list'
  },
  children:[
    {tagName:'li',props:{class:'item'},children:['Item 1']},
    {tagName:'li',props:{class:'item'},children:['Item 2']},
    {tagName:'li',props:{class:'item'},children:['Item 3']},
  ]
}

// 类似于
/**
 * <ul id='list'>
 *    <li class='item'>Item 1 </li>
 *    <li class='item'>Item 1 </li>
 *    <li class='item'>Item 1 </li>
 * </ul>
 */

function Element(tagName,props,children){
  this.tagName = tagName
  this.props = props
  this.children = children
}

Element.prototype.render = function(){
  var el = document.createElement(this.tagName)
  var props = this.props

  for(var propName in props){
    var propValue = props[propName]
    el.setAttribute(propName,propValue)
  }

  var children = this.children || []
  children.forEach(function(child){
    var childEl = (child instanceof Element)
      ? child.render()
      : document.createElement(child)
    el.appendChild(childEl)
  })

  return el;
}

module.exports = function(tagName,props,children){
  return new Element(tagName,props,children)
}