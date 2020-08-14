import React, { Component } from 'react';
import api from '../../services/api';
import moment from 'moment';

import logo from '../../assets/images/logo.png';
import CompareList from '../../components/CompareList';
import './Main.css';
import '../../../node_modules/font-awesome/css/font-awesome.css';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repositoryInput: '',
      repositories: [],
      repositoryError: false,
      loading: false,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(
        `/repos/${this.state.repositoryInput}`
      );

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryInput: '',
        repositories: [...this.state.repositories, repository],
        repositoryError: false,
      });
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleInputChange = (e) => {
    this.setState({ repositoryInput: e.target.value });
  };

  render() {
    return (
      <div className='main-container'>
        <img src={logo} alt='Github Compare' />

        <form onSubmit={this.handleSubmit}>
          {(this.state.repositoryError === false && (
            <input
              type='text'
              placeholder='usuário/repositório'
              value={this.state.repositoryInput}
              onChange={this.handleInputChange}
            />
          )) ||
            (this.state.repositoryError === true && (
              <input
                type='text'
                className='input-error'
                placeholder='usuário/repositório'
                value={this.state.repositoryInput}
                onChange={this.handleInputChange}
              />
            ))}

          <button type='submit'>
            {this.state.loading ? (
              <i className='fa fa-spinner fa-pulse' />
            ) : (
              '+'
            )}
          </button>
        </form>

        <CompareList repositories={this.state.repositories} />
      </div>
    );
  }
}
