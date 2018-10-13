import React from 'react';
class Template extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      code: false
    }
  }

  _code() {
    this.setState({code: !this.state.code})
  }

  render() {
    var vars = this.props.variables
    return (
      <div style={{margin:'20px'}}>
        <div style={{textAlign:'center'}}>
          <button onClick={::this._code} className={this.state.code ? "pure-button pure-button-secondary" : "pure-button pure-button-primary"}>
            Example React Component
          </button>
        </div>
        <br/>
        {::this._react(vars)}
      </div>
    )
  }

  _react(vars) {
    if(this.state.code){
      return (
        <pre><code style={{fontSize:'small'}}>
          &nbsp;&#34;use strict&#34;;<br/>
          &nbsp;import React from &#34;react&#34;;<br/>
          &nbsp;import &#123; connect &#125; from &#34;react-redux&#34;;<br/>
          &nbsp;<br/>
          &nbsp;class App extends React.Component&#123;<br/>
          	&nbsp;&nbsp;constructor(props)&#123;<br/>
          		&nbsp;&nbsp;&nbsp;super(props)<br/>
          		&nbsp;&nbsp;&nbsp;this.state = &#123;<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;password:&#34;&#34;<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;variables: &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;letters: {vars.letters},<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;capitals: {vars.capitals},<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengths: {vars.lengths},<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;numbers: {vars.numbers},<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;specials: [{vars.specials.join(', ')}]<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
              &nbsp;&nbsp;&nbsp;&#125;<br/>
            &nbsp;&nbsp;&#125;<br/>

            &nbsp;change(e) &#123;<br/>
              &nbsp;&nbsp;var newpass = e.target.value;<br/>
              &nbsp;&nbsp;this.setState(&#123;password: newpass&#125;);<br/>
            &nbsp;&#125;<br/>
          <br/>
            &nbsp;_lengths(password) &#123;<br/>
              console.log(password);<br/>
              &nbsp;&nbsp;let variable = this.props.variables.lengths;<br/>
              &nbsp;&nbsp;if(!variable || password.replace(/\s/g, &#34;&#34;).length &gt;= variable)&#123;<br/>
                &nbsp;&nbsp;&nbsp;return null<br/>
              &nbsp;&nbsp;&#125;<br/>
              &nbsp;&nbsp;return &lt;li key=&#34;length&#34;&gt;Your password needs to be atleast &#123;variable&#125; characters long.&lt;/li&gt;<br/>
            &nbsp;&#125;<br/>
          <br/>
            &nbsp;_letters(password) &#123;<br/>
              &nbsp;&nbsp;let variable = this.props.variables.letters;<br/>
              &nbsp;&nbsp;if(!variable || password.replace(/\W/g, &#34;&#34;).replace(/\d/g, &#34;&#34;).length &gt;= variable)&#123;<br/>
                &nbsp;&nbsp;&nbsp;return null<br/>
              &nbsp;&nbsp;&#125;<br/>
              &nbsp;&nbsp;return &lt;li key=&#34;letters&#34;&gt;Your password must contain atleast &#123;variable&#125; letters.&lt;/li&gt;<br/>
            &nbsp;&#125;<br/>
          <br/>
            &nbsp;_capitals(password) &#123;<br/>
              &nbsp;&nbsp;let variable = this.props.variables.capitals;<br/>
              &nbsp;&nbsp;if(!variable || password.replace(/[^A-Z]/g, &#34;&#34;).length &gt;= variable)&#123;<br/>
                &nbsp;&nbsp;&nbsp;return null<br/>
              &nbsp;&nbsp;&#125;<br/>
              &nbsp;&nbsp;return &lt;li key=&#34;capitals&#34;&gt;Your password must contain atleast &#123;variable&#125; capital letters.&lt;/li&gt;<br/>
            &nbsp;&#125;<br/>
          <br/>
            &nbsp;_numbers(password) &#123;<br/>
              &nbsp;&nbsp;let variable = this.props.variables.numbers;<br/>
              &nbsp;&nbsp;if(!variable || password.replace(/\D/g, &#34;&#34;).length &gt;= variable)&#123;<br/>
                &nbsp;&nbsp;&nbsp;return null<br/>
              &nbsp;&nbsp;&#125;<br/>
              &nbsp;&nbsp;return &lt;li key=&#34;numbers&#34;&gt;Your password must contain atleast &#123;variable&#125; numbers.&lt;/li&gt;<br/>
            &nbsp;&#125;<br/>
          <br/>
            &nbsp;_specials(password) &#123;<br/>
              &nbsp;&nbsp;let variable = this.props.variables.specials;<br/>
              &nbsp;&nbsp;if(!variable)&#123;<br/>
                &nbsp;&nbsp;&nbsp;return null<br/>
              &nbsp;&nbsp;&#125;<br/>
              &nbsp;&nbsp;for(var i = 0; i &lt; variable.length; i++)&#123;<br/>
                &nbsp;&nbsp;&nbsp;let v = variable[i];<br/>
                &nbsp;&nbsp;&nbsp;if(password.indexOf(v) === -1)&#123;return &lt;li key=&#34;specials&#34;&gt;Your password must contain the characters: &#123;variable.join(&#34; &#34;)&#125;.&lt;/li&gt;;&#125;<br/>
              &nbsp;&nbsp;&#125;<br/>
              &nbsp;&nbsp;return null<br/>
            &nbsp;&#125;<br/>
          <br/>
            &nbsp;_errors() &#123;<br/>
              &nbsp;&nbsp;let password = this.state.password<br/>
              &nbsp;&nbsp;if(!password)&#123;<br/>
                &nbsp;&nbsp;&nbsp;return null;<br/>
              &nbsp;&nbsp;&#125;<br/>
              &nbsp;&nbsp;return [<br/>
                &nbsp;&nbsp;&nbsp;::this._lengths(password),<br/>
                &nbsp;&nbsp;&nbsp;::this._letters(password),<br/>
                &nbsp;&nbsp;&nbsp;::this._capitals(password),<br/>
                &nbsp;&nbsp;&nbsp;::this._numbers(password),<br/>
                &nbsp;&nbsp;&nbsp;::this._specials(password)<br/>
              &nbsp;&nbsp;]<br/>
            &nbsp;&#125;<br/>
          <br/>
            &nbsp;render() &#123;<br/>
              &nbsp;&nbsp;return(<br/>
                &nbsp;&nbsp;&nbsp;&lt;div className=&#34;pure-g&#34;&gt;<br/>
                  &nbsp;&nbsp;&nbsp;&lt;div className=&#34;pure-u-1-5&#34;&gt;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&lt;/div&gt;<br/>
                  &nbsp;&nbsp;&nbsp;&lt;div className=&#34;pure-u-3-5 pure-form&#34;&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;input onChange=&#123;::this.change&#125; style=&#123;&#123;width:&#34;100%&#34;&#125;&#125;/&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;br/&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;ul className=&#34;error&#34;&gt;<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;::this._errors()&#125;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/ul&gt;<br/>
                  &nbsp;&nbsp;&nbsp;&lt;/div&gt;<br/>
                &nbsp;&nbsp;&lt;/div&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;)<br/>
            &nbsp;&nbsp;&#125;<br/>
          &nbsp;&#125;<br/>
          &nbsp;var mapStateToProps = function(state)&#123;<br/>
              &nbsp;&nbsp;return &#123;variables:state.variables&#125;;<br/>
          &nbsp;&#125;;<br/>
          <br/>
          &nbsp;export default connect(mapStateToProps)(App);<br/>
          <br/>
        </code></pre>
      )
    }
    return null;
  }
}
export default Template;
