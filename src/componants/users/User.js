import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../layouts/Spinner';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/githubContext';

const User = () => {
  const githubContext = useContext(GithubContext);
  const { getUser, loading, user, repos, getUserRepos } = githubContext;
  
  const { login } = useParams();

  useEffect(() => {
    getUser(login);
    getUserRepos(login);
    // eslint-disable-next-line
  }, []);


  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
    company,
  } = user;


  if (loading) return <Spinner />
  return (
    <div>
      <Fragment>
        <Link to='/' className='btn btn-light'>
          Back to Search
        </Link>
        Hireable :{''}
        {hireable ? <i className='fas fa-check text-success' /> : <i className='fas fa-times-circle text-danger' />}

        <div className='card grid-2'>
          <div className='all-center'>
            <img src={avatar_url} className='round-img' alt='' style={{ width: '150px' }}></img>
            <h1>{name}</h1>
            <p>Location:{location}</p>
          </div>
          <div>
            {bio && (<Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>)}
            <a href={html_url} className='btn btn-dark my-1'>
              Visit Github Profile
            </a>
            <ul>
              <li>
                {login && <Fragment>
                  <strong>Username:</strong> {name}
                </Fragment>}
              </li>
              <li>
                {company && <Fragment>
                  <strong>company:</strong> {company}
                </Fragment>}
              </li>
              <li>
                {blog && <Fragment>
                  <strong>Website:</strong> {blog}
                </Fragment>}
              </li>
            </ul>
          </div>
        </div>
        <div className='card text-center'>
          <div className='badge badge-primary'>Followers: {followers}</div>
          <div className='badge badge-success'>Following: {following}</div>
          <div className='badge badge-light'>Public Repos: {public_repos}</div>
          <div className='badge badge-dark'>Public gists: {public_gists}</div>
        </div>

        <Repos repos={repos} />
      </Fragment>
    </div>
  );
};

export default User;
