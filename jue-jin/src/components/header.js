import React from "react";
import Tablist from "./basis/tabList";
import Tab2 from "./basis/tab2";
import {categories as Second_categories} from "../utils/fake-api/data/categories";


/**
 * 生成头部的3个tab
 * 1. 一级分类tab：传入参数固定（与二级分类格式一致），保存激活id作为category_id保存至state中，指导二级tab的生成以及文章获取
 * 2. 二级分类tab：传入根据一级分类的category_id生成的二级tab，根据二级分类的激活id判断是否更新category_id
 * 3. 三级tab：传入参数固定（与二级分类格式一致），前两个选项作为获取文章的排序参数，后一个是另一个功能，获取历史观看文章，需要做一下区分
 */
const first_categories = [
  { category_id: 0, category_name: '推荐' },
  { category_id: 1, category_name: '后端' },
  { category_id: 2, category_name: '前端' },
  { category_id: 3, category_name: 'Android' },
  { category_id: 4, category_name: 'IOS' },
];
   
const third_tab = [
  { category_id: 0, category_name: '热门' },
  { category_id: 1, category_name: '最新' },
  { category_id: 2, category_name: '历史' },
];

class Header extends React.Component {
  first_categories;
  third_tab;

  constructor(props) {
    super(props);
    this.state = {
      first_ctg: 0,
      second_categories: [],
    };

    this.changeFisrtCtg = this.changeFisrtCtg.bind(this);
  }

  changeFisrtCtg(id){
    this.setState({first_ctg : id});
    this.setState(() => ({second_categories : Second_categories[id].children || []}));
  }

  render() {
    return (
        <div className="Header">
            <Tablist contents={first_categories} changeCtgId={this.props.changeCtgId} changeFisrtCtg={this.changeFisrtCtg} tabNum="1"></Tablist>
            
            {
              (this.state.second_categories.length) 
              ?
              <Tab2 contents={this.state.second_categories} changeCtgId={this.props.changeCtgId} tabNum="2"></Tab2>
              :
              ""
            }
            <Tablist contents={third_tab} changeSortedBy={this.props.changeSortedBy} tabNum="3"></Tablist>
        </div>
      );
    }
}

export default Header;