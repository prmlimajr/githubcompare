import React from 'react';
import PropTypes from 'prop-types';

import './CompareList.css';

const CompareList = ({ repositories }) => {
  return (
    <div className='compare-list-container'>
      {repositories.map((repository) => (
        <div className='repository' key={repository.id}>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <strong>{repository.name}</strong>
            <small className='owner'>{repository.owner.login}</small>
          </header>

          <ul>
            <li>
              {repository.stargazers_count}{' '}
              <small className='info'>stars</small>
            </li>
            <li>
              {repository.forks_count} <small className='info'>forks</small>
            </li>
            <li>
              {repository.open_issues_count}{' '}
              <small className='info'>issues</small>
            </li>
            <li>
              {repository.lastCommit}{' '}
              <small className='info'>last commit</small>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar: PropTypes.string,
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
    })
  ).isRequired,
};

export default CompareList;
