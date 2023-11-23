import React, { Component } from 'react';
import Section from '../Section/Section';
import Searchbar from '../Searchbar/Searchbar';
import Gallery from 'components/Gallery/Gallery';

export default class App extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = dataForm => {
    this.setState({ searchQuery: dataForm.trim() });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>
        <Section>
          <Gallery searchQuery={this.state.searchQuery}></Gallery>
        </Section>
      </>
    );
  }
}
