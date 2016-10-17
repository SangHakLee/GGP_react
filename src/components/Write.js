import React from 'react';

class Write extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          contents: ''
      };

      this.handleChange = this.handleChange.bind(this);
      this.handlePost = this.handlePost.bind(this);

  }

  handleChange(e) {
      this.setState({
          contents: e.target.value
      });
  }

  handlePost() {
        let contents = this.state.contents;
		console.lot('contents', contents);

        this.props.onPost(contents).then(
            () => {
                this.setState({
                    contents: ""
                });
            }
        );
	}

	handleFuck() {
		this.props.test().then(
			() => {
				console.log('????');
			}
		);
	}

    render() {
      return (
          <div className="container write">
              <div className="card">
                  <div className="card-content">
                    <textarea
                            className="materialize-textarea"
                            placeholder="키워드를 입력하세요."
                            value={this.state.contents}
                            onChange={this.handleChange}>
                    </textarea>
                  </div>
                  <div className="card-action">
                      <a onClick={this.handlePost}>POST</a>
                      <a onClick={this.handleFuck}>Fuck</a>
                  </div>
              </div>
          </div>
      );
    }
}

Write.propTypes = {
    onPost: React.PropTypes.func,
	test : React.PropTypes.func
};

Write.defaultProps = {
    onPost: (contents) => { console.error('post function not defined', contents); },
	test: () => {
		console.log('what the f');
	}
};

export default Write;
