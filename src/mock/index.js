import Mock from 'mockjs'

// 基本配置
Mock.setup({
  // 随机延迟
  timeout: '500-1000'
})

// 拦截接口
// 1.接口地址规则 2.请求方式 3.返回数据

Mock.mock(/\/goods\/.+\/evaluate\/page/, 'get', () => {
  // 随机数据逻辑
  const items = []
  for (let i = 0; i < 15; i++) {
    items.push(Mock.mock({
      id: '@id',
      orderInfo: {
        specs: [
          {
            name: '@cword(2,4)',
            valueName: '@word(2,5)'
          },
          {
            name: '@cword(2,4)',
            valueName: '@word(2,5)'
          },
          {
            name: '@cword(2,4)',
            valueName: '@word(2,5)'
          }
        ],
        quality: '@integer(1,100)',
        createTime: '@date("yyyy-mm-dd h:m:s")'
      },
      member: {
        id: '@id',
        nickname: '@name',
        avatar: 'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/avatar_1.png'
      },
      score: '@integer(1,5)',
      tags: ['@cword(2,5)', '@cword(2,5)', '@cword(2,5)'],
      content: '@cword(15,75)',
      picture: [
        'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/avatar_1.png',
        'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/avatar_1.png',
        'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/avatar_1.png',
        'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/avatar_1.png',
        'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/avatar_1.png',
        'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/avatar_1.png',
        'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/avatar_1.png',
        'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/avatar_1.png',
        'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/avatar_1.png'
      ],
      officialReply: '@cword(10,30)',
      praiseCount: '@integer(0,1000)',
      createTime: '@date("yyyy-mm-dd h:m:s")'
    }))
  }
  return Mock.mock({
    msg: '评论数据mock成功',
    result: {
      counts: 115,
      pageSize: 12,
      pages: 10,
      page: '@integer(1,10)',
      items
    }
  })
})
