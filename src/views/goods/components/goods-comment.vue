<template>
  <div class="goods-comment">
    <div class="head">
      <div class="data">
        <p><span>{{ commentInfo.salesCount }}</span><span>人购买</span></p>
        <p><span>{{ commentInfo.praisePercent }}%</span><span>好评率</span></p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a href="javascript:;" :class="{active : isActive === i}" @click="changeTag(i)" v-for="(tag,i) in commentInfo.tags" :key="tag.title">{{`${tag.title} (${tag.tagCount})`}}</a>

        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a href="javascript:;" :class="{active : requestParams.sortField === null}" @click="changeSortField(null)">默认</a>
      <a href="javascript:;" :class="{active : requestParams.sortField === 'createTime'}" @click="changeSortField('createTime')">最新</a>
      <a href="javascript:;" :class="{active : requestParams.sortField === 'praiseCount'}" @click="changeSortField('praiseCount')">最热</a>
    </div>
    <!-- 评价列表 -->
    <!-- 列表 -->
    <div class="list" v-if="commentList">
      <div class="item" v-for="item in commentList.items" :key="item.id ?? item">
        <div class="user">
          <img :src="item.member.avatar" alt="">
          <span>{{ formatNickname(item.member.nickname) }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i class="iconfont icon-wjx01" v-for="i in item.score" :key="i + 's'"></i>
            <i class="iconfont icon-wjx02" v-for="i in 5 - item.score" :key="i + 'e'"></i>
            <span class="attr">{{ formatSpecs(item.orderInfo.specs) }}</span>
          </div>
          <div class="text">{{item.content}}</div>
          <!-- 评论图片组件 -->
          <goods-comment-image :pictures="item.pictures"></goods-comment-image>
          <div class="time">
            <span>{{item.createTime}}</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i>{{item.praiseCount}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页组件 -->
    <xtx-pagination :page="commentList.page" :pages="commentList.pages" @changePage="changePage"></xtx-pagination>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { findGoodsCommentInfo, findGoodsCommentList } from '@/api/product'
import { ref, watch } from 'vue'
import GoodsCommentImage from '@/views/goods/components/goods-comment-image'

export default {
  name: 'GoodsComment',
  components: {
    GoodsCommentImage
  },

  setup () {
    const route = useRoute()
    const commentInfo = ref({})
    // 获取评价信息
    findGoodsCommentInfo(route.params.id).then(data => {
      data.result.tags.unshift({ title: '有图', tagCount: data.result.hasPictureCount })
      data.result.tags.unshift({ title: '全部评价', tagCount: data.result.evaluateCount })
      commentInfo.value = data.result
    })
    const isActive = ref(0)
    // 切换tag属性
    const changeTag = (i) => {
      isActive.value = i
      if (i === 0) {
        // 选中全部，不带任何标签
        requestParams.value.tag = null
        requestParams.value.hasPicture = null
      } else if (i === 1) {
        // 选中有图
        requestParams.value.tag = null
        requestParams.value.hasPicture = true
      } else {
        requestParams.value.hasPicture = null
        requestParams.value.tag = commentInfo.value.tags[i].title
      }
      requestParams.value.page = 1
    }
    // 切换排序标准
    const changeSortField = (field) => {
      requestParams.value.sortField = field
      requestParams.value.page = 1
    }
    // 准备筛选条件
    const requestParams = ref({
      page: 1,
      pageSize: 12,
      hasPicture: null,
      tag: null,
      // [praiseCount,createTime]可选方式 热度/最新
      sortField: null
    })
    const commentList = ref({})
    // 监听params，发生改变就发送请求
    watch(requestParams.value, () => {
      findGoodsCommentList(route.params.id, requestParams).then(data => {
        console.log(data.result)
        commentList.value = data.result
      })
    }, { immediate: true })

    // 实现分页切换
    const changePage = (newPage) => {
      requestParams.value.page = newPage
    }

    // 自定义转换数据的函数 对于 vue2 中的过滤器
    const formatSpecs = (specs) => {
      return specs.reduce((pre, cur) => `${pre} ${cur.name}: ${cur.valueName}`, '').trim()
    }
    const formatNickname = (nickname) => {
      return nickname[0] + '****' + nickname.at(-1)
    }
    return { commentInfo, isActive, requestParams, changeTag, changeSortField, commentList, formatSpecs, formatNickname, changePage }
  }
}
</script>
<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor,50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,&:hover {
        color: @xtxColor;
      }
    }
  }
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>
