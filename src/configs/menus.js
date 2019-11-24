

export default [
  {
    icon:'home',
    title:'首页',
    path:'/'
  },
  {
    icon:'appstore',
    title:'商品',
    path:'/products',
    children:[
      {
        icon:'highlight',
        title:'分类管理',
        path:'/category'
      },
      {
        icon:'bank',
        title:'商品管理',
        path:'/product'
      },

    ]

  },
  {
    icon:'user',
    title:'用户管理',
    path:'/user'
  },
  {
    icon:'safety-certificate',
    title:'权限管理',
    path:'/role'
  },
  {
    icon:'rocket',
    title:'图形图表',
    path:'/charts',
    children:[
      {
        icon:'bar-chart',
        title:'柱形图',
        path:'/charts/bar'
      },
      {
        icon:'line-chart',
        title:'折线图',
        path:'/charts/line'
      },
      {
        icon:'pie-chart',
        title:'饼状图',
        path:'/charts/pie'
      },

    ]

  },

]
