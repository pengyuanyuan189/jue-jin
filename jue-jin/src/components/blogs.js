import React from "react";
import BlogItem from "./basis/BlogItem";
import { getArticles } from "../utils/fake-api/index";

class Blogs extends React.Component {
  constructor(props) {
    super(props); 
    this.articleList = [];
    this.handleClick = this.handleClick.bind(this);
    this.itemRender = this.itemRender.bind(this);
    this.drawArticleList = this.drawArticleList.bind(this);
  }

  handleClick(e) {
    e = e || window.event;
    let target = e.target || e.srcElement;
    if(target.nodeName.toLowerCase() === 'li') {
      console.log(target.key);
    }
  }

  itemRender(categoryId) {
    this.drawArticleList(categoryId);
    return this.articleList.map(x => (<li className="blogList" key={x.article_id}><BlogItem article={x}></BlogItem></li>));
  }

  drawArticleList(categoryId) {
    getArticles(parseInt(categoryId)).then(res => {
      this.articleList = res.data.articles;
    }).catch(e => {
      console.log(e);
    })
  }

  /**
   * 无限下拉列表
   * @returns 
   */
  /*static propTypes={
    height:PropTypes.oneOfType([PropTypes.string,PropTypes.number]).isRequired,//列表容器的高度
    itemHeight:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),//每一行的高度
    renderItem:PropTypes.func.isRequired,//渲染item的方法
    dataSource:PropTypes.array.isRequired//列表数据源
}

constructor(props){
     super(props);
    this.state={
        needCalcItemHeight:!props.itemHeight,//是否需要计算每一行的高度。当父级不传itemHeight的时候，需要计算
        cur:0,//记录在容器最顶部的元素的index
        itemHeight:props.itemHeight,
        size:props.itemHeight?Math.ceil(props.height/props.itemHeight):1
    }
    this.scroll = throttle(this.scroll,60);//节流处理
}
componentDidMount(){
    //计算item的高度
     this.calcItemHeight();
    //注册容器滚动监听事件
    this.list.addEventListener('scroll',this.scroll);
}

calcItemHeight=()=>{
 const { needCalcItemHeight } =this.state
    if(needCalcItemHeight&&this.firstDom){
        const itemHeight = this.firstDom.offsetHeight;//获取当前div的高度
        this.setState({
            itemHeight,
            needCalcItemHeight:false,
            size:Math.ceil(this.props.height/itemHeight)
        })
    }
}

scroll=(e)=>{
    //这个监听事件干嘛呢  计算当前滑动到容器顶部的元素是第几个
    const index = Math.ceil(e.target.scrollTop/this.state.itemHeight);
    if(Math.abs(index-cur)>size){
       this.setState({ cur:index })  
    }
   //注意：这里没必要index一变就更新state，会造成很多不必要的render。所以加上个条件，只有当前index-上一次记录的cur>一屏size的时候 再更新cur
}
renderFirstDom=()=>{
     const { dataSource,renderItem} =this.props
   return <div ref={(ref)=>{ this.firstDome = ref }}>
   {renderItem(dataSource[0],0)}
   </div> 
}

handleData=(data)=>{
     const {size,cur} =this.state;
    const newData=[...data];//浅拷贝一份数据
    //该怎么截取数据呢，按照开始的思路，先截取一容器高度的行数。 
    if(data.length<size){
        return newData
    }
     return newData.splice(cur,size);
}

renderList=()=>{
    //渲染list的时候，要将数据源处理一下，截取出来我们需要渲染的数据
    const data = this.handleData(this.props.dataSource);
    return data.map((item,index)=>{
        return this.props.renderItem(item,index)
    })
}

getContent=()=>{
 let content;
    //当父组件没传itemHeight的时候，先渲染一条数据，计算一行的高度
    const { needCalcItemHeight }  = this.state;
    if(needCalcItemHeight){
       content =  this.renderFirstDom()
    }else{
       content= this.renderList()
    }
    return content
}
render(){
     const { height } = this.props;
     
    return(
     <div 
         ref={(ref)=>{ this.list =ref}}
         style={{
             height,
             overflow:'auto'
         }}
     >
         {this.getContent()}
     </div>
    )
}
}*/

  render() {
    this.drawArticleList(this.props.categoryId, this.props.sortedBy);
    return (
        <ul className="Blogs" onClick={this.handleClick}>
            { this.itemRender(this.articleList) }
        </ul>
    );
  }
}

export default Blogs;