import React from 'react';
import { connect } from 'dva';
import Modal from 'antd-mobile/lib/modal/index';
import 'antd-mobile/es/modal/style/index.css';
import BaseComponent from '../../baseComponent';
import mobileRouteComponent from '../../../common/mobileRouteComponent';
import styles from './quotaCoinBlock.less';

class QuotaCoinBlock extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      showLayer: false,
    };
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'quotaCoinBlock',
        obj: {
          '进入': '进入中间页',
        },
      },
    });
    window.scrollTo(0, 0);
    this.props.dispatch({
      type: 'pageConstruction/hideRouteLoading',
      pageName: 'quotaCoin',
    });
    this.props.dispatch({
      type: 'quotaCoinBlock/getPoster',
    });
  }
  closeLayer() {
    this.setState({
      showLayer: false,
    });
  }
  showLayerBtn() {
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'quotaCoinshowLayerBtn',
      },
    });
    this.setState({
      showLayer: true,
    });
  }
  gotoText() {
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'quotaCoingotoText',
      },
    });
    const anchorElement = document.getElementById('textName');
    anchorElement.scrollIntoView();
  }
  toOpen() {
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'quotaCoingotoOpen',
      },
    });
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: {
        pageName: 'toOpen',
        params: { typeId: 719, typeName: 'AI诊币', backPath: 'quotaCoinBlock' },
      },
    });
  }
  render() {
    console.log('render=>', this.props);
    const { userInfo } = this.props;
    if (!userInfo) {
      return null;
    }
    const { data } = userInfo;
    let layerDom = null;
    layerDom = (
      <Modal
        className={styles.shareBg}
        visible={this.state.showLayer}
        transparent
        maskClosable
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        onClose={this.closeLayer.bind(this)}
      >
        <div>
          <div style={{ lineHeight: '1.08rem' }}>
            <span className={styles.titleTips}>长按图片发送好友</span>
            <img src="/images/msgImages/1.png" alt="" className={styles.finger} />
          </div>
          <div style={{ height: 400, overflow: 'scroll' }}>
            <img style={{ height: 'auto', width: '5rem' }} src={data.imgUrl} alt="" />
          </div>
        </div>
      </Modal>
    );
    return (
      <div className={styles.centerBlock}>
        <div className={styles.banner}>
          <img alt="" src="/images/quotaCoin/one.jpg" />
        </div>
        <div className={styles.textBan}>
          想知道币价未来走势？用币评AI诊币，基于机器学习，综合分析影响盘面数据后得出。
        </div>
        <div className={styles.one}>
          <img alt="" src="/images/quotaCoin/two1.jpg" />
        </div>
        <div className={styles.text1}>
          <div className={styles.header}>
            <div className={styles.line}>{}</div>
            <span>币评团队</span>
          </div>
          <div className={styles.textCon}>
            团队成员来自腾讯、阿里及知名区块链公司，拥有互联网、金融、数学等专业背景。在区块链领域鱼龙混杂的当下，币评致力于打造最好用的币圈投资工具，为投资者提供最有价值的建议。
          </div>
          <div className={styles.userInfo}>
            <img alt="" src={data.headImg} />
            <div className={styles.infoCenter}>
              <span className={styles.span1}>币评（No:{data.vid}）</span>
              <span className={styles.span2}>还需邀请{data.maxCount - data.nowCount < 0 ? 0 : data.maxCount - data.nowCount}人才有参与资格</span>
            </div>
            <button onClick={() => this.showLayerBtn()} className={styles.infoBtn}>邀请好友</button>
          </div>
          <div className={styles.userPrice}>
            <div className={styles.left}>
              <span className={styles.triangle}>{}</span>
              <span>活动原价</span>
              <span className={styles.spanNum}>￥39.00</span>
            </div>
            <div className={styles.center}>
              <span>需邀请人数</span>
              <span className={styles.spanNum}>{data.maxCount}</span>
            </div>
            <div className={styles.right}>
              <span>已邀请</span>
              <span className={styles.spanNum}>{data.nowCount}</span>
            </div>
          </div>
        </div>
        <div id="textName" className={styles.text2}>
          <div className={styles.header}>
            <div className={styles.line}>{}</div>
            <span>参与规则</span>
          </div>
          <p className={styles.p1}>
            免费方式：点击右下角“邀请好友”按钮，生成邀请海报，成功邀请5个好友关注【币评区块链】公众号，即可获得AI诊币内测服务，本次免费内测仅开放500个名额，先到先得。
          </p>
          <p className={styles.p2}>
            付费方式：AI诊币服务￥39元，本次开放500个名额。缴费成功后，系统即为您自动开通。
          </p>
          <p onClick={() => this.toOpen()} className={styles.p3}>
            进入限时购买通道
            <img alt="" src="/images/quotaCoin/four.png" />
          </p>
        </div>
        <div className={styles.footerBtn}>
          <div onClick={() => this.gotoText()} className={styles.leftBtn}>参与规则</div>
          <div onClick={() => this.showLayerBtn()} className={styles.rightBtn}>邀请好友</div>
        </div>
        {layerDom}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.quotaCoinBlock;
}

export default connect(mapStateToProps)(mobileRouteComponent(QuotaCoinBlock));
