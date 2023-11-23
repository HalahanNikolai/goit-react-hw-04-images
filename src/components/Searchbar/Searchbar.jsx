import Notiflix from 'notiflix';
import React, { Component } from 'react';
import {
  SearchbarWrap,
  SearchbarForm,
  SearchbarButton,
  SearchbarSpan,
  SearchbarInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    searcQuery: '',
  };

  handleChange = event => {
    const inputValue = event.target.value;
    this.setState({ searcQuery: inputValue });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.searcQuery.trim()) {
      return Notiflix.Report.failure(
        'PixQuery Failure',
        'Please enter a keyword or phrase to search for photos. We will do our best to find suitable images for you.',
        'Okay'
      );
    }
    this.props.onSubmit(this.state.searcQuery);
  };

  render() {
    return (
      <SearchbarWrap>
        <SearchbarForm onSubmit={this.handleSubmit}>
          <SearchbarButton type="submit">
            <SearchbarSpan></SearchbarSpan>
          </SearchbarButton>

          <SearchbarInput
            id="searchInput"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </SearchbarForm>
      </SearchbarWrap>
    );
  }
}
