import React, { Component } from 'react';
import { connect } from 'dva';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import { Card, WhiteSpace } from 'antd-mobile';
/**
 * 老人账号信息页面
 * @author 梁慕学
 * @Date  2017-12-25
 */
function genDynamics({ dispatch, accountInfo }) {
  // const { customerName } = accountInfo;

  return (
    <div>
      <WhiteSpace size="lg" />
      <Card full = 'true'  style={{
        textAlign:'left',

      }}>
        <Card.Header title="NEO NEO见面会" style={{
        textAlign:'left',
        fontSize:'  20px'
        }} />
        <Card.Body style={{
          color:"#EBEBEB"
        }}>
          <div>NEO NEO见面会NEO NEO见面会NEO NEO见面会NEO NEO见面会NEO NEO见面会</div>
        </Card.Body>
        <Card.Footer content={<div> 币时间 1000阅读  刚刚</div>}
        style={{
          color:'gray',
          position:'relative',
            marginBottom:'1.5rem'
        }}
        extra={<div style={{
          color:'black',
          position:"absolute",
          right:'10px',
          top:0


        }}>X</div>} />

      </Card>


      <Card full = 'true'  style={{
        textAlign:'left',

      }}>
        <Card.Header title="NEO NEO见面会" style={{
        textAlign:'left',
        fontSize:'  20px'
        }} />
        <Card.Body style={{
          color:"#EBEBEB"
        }}>
          <div>NEO NEO见面会NEO NEO见面会NEO NEO见面会NEO NEO见面会NEO NEO见面会</div>
        </Card.Body>
        <Card.Footer content={<div> 币时间 1000阅读  刚刚</div>}
        style={{
          color:'gray',
          position:'relative',
            marginBottom:'1.5rem'
        }}
        extra={<div style={{
          color:'black',
          position:"absolute",
          right:'10px',
          top:0


        }}>X</div>} />

      </Card>
    </div>


  );
}

class AccountInfo extends Component {
  constructor(props) {
    console.log('props in AccountInfo', props);
    super(props);
  }
  render() {
    console.log('AccountInfo render');
    return genDynamics(this.props);
  }
}

function mapStateToProps({ state }) {
  return { state };
}

export default connect(mapStateToProps)(mobileRouteComponent(AccountInfo));
// export default mobileRouteComponent(AccountInfo);
