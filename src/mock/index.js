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
  const pages = Mock.mock('@integer(1,15)')
  const page = Math.min(Mock.mock('@integer(1,15)'), pages)
  const counts = pages * 12 + Mock.mock('@integer(-11,0)')
  console.log(counts, pages, page)
  for (let i = 0; i < 12; i++) {
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
      pictures: [
        'https://yanxuan-item.nosdn.127.net/bc7298eb106089530bb6fbcdff81b15e.png',
        'https://yanxuan-item.nosdn.127.net/6142dcc28dbf0523349f4870e09e526e.jpg',
        'https://yanxuan-item.nosdn.127.net/b21860c9559943160253d2aaf557773c.jpg',
        'https://yanxuan-item.nosdn.127.net/c492f8840c8c6028ca09c5479b577798.jpg',
        'https://yanxuan-item.nosdn.127.net/a6a803f49726092da1a67bb9d8bf3a13.png'
      ].sort((a, b) => Math.random() - 0.5),
      officialReply: '@cword(10,30)',
      praiseCount: '@integer(0,1000)',
      createTime: '@date("yyyy-mm-dd h:m:s")'
    }))
  }
  return Mock.mock({
    msg: '评论数据mock成功',
    result: {
      counts,
      pageSize: 12,
      pages,
      page,
      items
    }
  })
})
