import React from 'react';
import TimeAgo from 'react-timeago';

class Memo extends React.Component {
    render() {

      const { data, ownership } = this.props;

      const memoView = (
        <div className="card">
            <div className="info">
                <a className="username">{data.writer}</a> wrote a log · <TimeAgo date={data.date.created}/>
                { ownership ? dropDownMenu : undefined }
            </div>
            <div className="card-content">
                {data.contents}
            </div>
            <div className="footer">
                <i className="material-icons log-footer-icon star icon-button">star</i>
                <span className="star-count">{data.starred.length}</span>
            </div>
        </div>
      );

      const dropDownMenu = (
            <div className="option-button">
                <a className='dropdown-button'
                     id={`dropdown-button-${data._id}`}
                     data-activates={`dropdown-${data._id}`}>
                    <i className="material-icons icon-button">more_vert</i>
                </a>
                <ul id={`dropdown-${data._id}`} className='dropdown-content'>
                    <li><a>Edit</a></li>
                    <li><a>Remove</a></li>
                </ul>
            </div>
        );

      return (
          <div className="container memo">
            { memoView }
          </div>
      );
    }

    componentDidUpdate() {
        // WHEN COMPONENT UPDATES, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN LOGGED IN)
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
    }

    componentDidMount() {
        // WHEN COMPONENT MOUNTS, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN REFRESHED)
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
    }
}

Memo.propTypes = {
    data: React.PropTypes.object,
    // 해당 메모가 자신의 것인지 확인
    ownership: React.PropTypes.bool
};

Memo.defaultProps = {
    data: {
        _id: 'id1234567890',
        writer: '글쓴이',
        contents: '내용',
        is_edited: false,
        date: {
            edited: new Date(),
            created: new Date()
        },
        starred: []
    },
    ownership: true
}

export default Memo;
