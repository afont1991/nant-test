import React, { useEffect, useState } from 'react'
import { styled } from '@mui/styles'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  TextField,
  Modal,
  Typography,
} from '@mui/material'
import axios from 'axios'
import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'

const escapeRegExp = (value) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const columns = [
  { field: 'name', headerName: 'Company Name'},
  { field: 'state', headerName: 'State'},
];

const Container = styled(Box)(() => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const Header = styled(Box)(() => ({
  height: 100,
  width: '100%',
  display: 'flex',
}));

const Content = styled(Box)(() => ({
  flexGrow: 1,
}));

const SearchBarContainer = styled(Box)(() => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const TextFieldStyled = styled(TextField)(() => ({
  '& .MuiInput-underline:before': {
    borderBottom: '1px solid black',
  },
}));

const ModalContainerStyled = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  background: 'white',
  padding: 20,
  p: 4,
}));

const SearchFilter = (props) => {
  return (
    <SearchBarContainer>
      <div>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </div>
      <TextFieldStyled
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        id='search'
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
      />
    </SearchBarContainer>
  );
}

const DetailsModal = ({ isOpen, handleClose, details }) => {
  return !details ? null : (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
      <ModalContainerStyled>
        <Typography variant="h6">
          Name: {details.name}
        </Typography>
        <Typography variant="h6">
          Location: {details.location}
        </Typography>
        <Typography variant="h6">
          State: {details.state}
        </Typography>
        <Typography variant="h6">
          Zip: {details.zipcode}
        </Typography>
        <Typography variant="h6">
          Stock Symbol: {details.stocksymbol}
        </Typography>
        <Typography variant="h6">
          CEO: {details.CEO}
        </Typography>
      </ModalContainerStyled>
    </Modal>
  )
}

const Home = () => {
  const [ isOpen, setIsOpen ] = useState()
  const [ locations, setLocations ] = useState()
  const [ filteredLocations, setFilteredLocations ] = useState()
  const [ searchText, setSearchText ] = useState('')
  const [ selectedLocation, setSelectedLocation ] = useState()
  const handleClose = () => {
    setIsOpen(false)
  }
  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = locations.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setFilteredLocations(filteredRows);
  };
  const handleRowClick = (params) => {
    setSelectedLocation(params.row)
    setIsOpen(true)
  }
  useEffect(() => {
    const getLocations = async () => {
      try {
        const locationsResponse = await axios.get('/api/locations')
        // formatting for DataGrid - requires ID field - using index as ID
        const locationsWithId = locationsResponse.data.map((details, id) => ({
          id,
          ...details,
        }))
        setLocations(locationsWithId)
        setFilteredLocations(locationsWithId)
      } catch (error) {
        // normally we would handle errors more elegantly!
        console.log('ERROR', error)
      }
    }
    if(!locations) { getLocations() }
  }, [setLocations, locations, setFilteredLocations])
  return !locations ? null : (
    <Container>
      <Header>
        <AppBar>
          <Toolbar>
          </Toolbar>
        </AppBar>
      </Header>
      <Content>
      <DataGrid
        components={{ Toolbar: SearchFilter }}
        rows={filteredLocations}
        columns={columns}
        onRowClick={handleRowClick}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: (event) => requestSearch(event.target.value),
            clearSearch: () => requestSearch(''),
          },
        }}
      />
      </Content>
      <DetailsModal isOpen={isOpen} handleClose={handleClose} details={selectedLocation} />
    </Container>
  )
}

export default Home
