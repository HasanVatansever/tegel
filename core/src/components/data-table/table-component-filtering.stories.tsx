import { formatHtmlPreview } from '../../utils/utils';
import sddsTable from './table/readme.md';
import sddsTableToolbar from './table-toolbar/readme.md';
import sddsHeader from './table-header/readme.md';
import sddsHeaderCell from './table-header-cell/readme.md';
import sddsTableBody from './table-body/readme.md';
import sddsBodyRow from './table-body-row/readme.md';
import sddsBodyRowExpandable from './table-body-row-expandable/readme.md';
import sddsBodyCell from './table-body-cell/readme.md';
import sddsTableFooter from './table-footer/readme.md';
import dummyData from './table-body/dummy-data.json';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: `${ComponentsFolder}/Data Table`,
  parameters: {
    notes: {
      'sdds-table': sddsTable,
      'sdds-table-toolbar': sddsTableToolbar,
      'sdds-header': sddsHeader,
      'sdds-header-cell': sddsHeaderCell,
      'sdds-table-body': sddsTableBody,
      'sdds-body-row': sddsBodyRow,
      'sdds-body-row-expandable': sddsBodyRowExpandable,
      'sdds-body-cell': sddsBodyCell,
      'sdds-table-footer': sddsTableFooter,
    },
  },
  argTypes: {
    modeVariant: {
      name: 'Mode variant',
      description:
        'Mode variant adjusts component colors to have better visibility depending on global mode and background.',
      control: {
        type: 'radio',
      },
      options: ['Inherit from parent', 'Primary', 'Secondary'],
      table: {
        defaultValue: { summary: 'Inherit from parent' },
      },
    },
    compactDesign: {
      name: 'Compact design',
      description: 'Enables compact design of the table, rows with less height.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    responsiveDesign: {
      name: 'Responsive table',
      description:
        'Enables table to take 100% of available width. For column values less than 192px, "No minimum width" has to be enabled too.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    useDataProp: {
      name: 'Use data prop',
      description: 'Loads table data from property.',
      control: {
        type: 'boolean',
      },
    },
    verticalDivider: {
      name: 'Vertical dividers',
      description: 'Enables vertical dividers between table columns.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    noMinWidth: {
      name: 'No minimum width',
      description:
        'Resets min-width rule and enables setting column width value to less than 192px which is the default. When enabled, controls for column width will show here.',
      control: {
        type: 'boolean',
      },
    },
    column1Width: {
      name: 'Column 1 width',
      description:
        'Value of width for column 1. In order to work correctly "No minimum width" has to be enabled too. When editing please provide a unit next to the value, eg. 200px.',
      control: {
        type: 'text',
      },
      if: { arg: 'noMinWidth', eq: true },
    },
    column2Width: {
      name: 'Column 2 width',
      description:
        'Value of width for column 2. In order to work correctly "No minimum width" has to be enabled too. When editing please provide a unit next to the value, eg. 200px.',
      control: {
        type: 'text',
      },
      if: { arg: 'noMinWidth', eq: true },
    },
    column3Width: {
      name: 'Column 3 width',
      description:
        'Value of width for column 3. In order to work correctly "No minimum width" has to be enabled too. When editing please provide a unit next to the value, eg. 200px.',
      control: {
        type: 'text',
      },
      if: { arg: 'noMinWidth', eq: true },
    },
    column4Width: {
      name: 'Column 4 width',
      description:
        'Value of width for column 4. In order to work correctly "No minimum width" has to be enabled too. When editing please provide a unit next to the value, eg. 200px.',
      control: {
        type: 'text',
      },
      if: { arg: 'noMinWidth', eq: true },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    compactDesign: false,
    responsiveDesign: true,
    useDataProp: true,
    verticalDivider: false,
    noMinWidth: false,
    column1Width: '',
    column2Width: '',
    column3Width: '',
    column4Width: '',
  },
};

const FilteringTemplate = ({
  modeVariant,
  compactDesign,
  responsiveDesign,
  useDataProp,
  verticalDivider,
  noMinWidth,
  column1Width,
  column2Width,
  column3Width,
  column4Width,
}) =>
  formatHtmlPreview(`
   <sdds-table
      vertical-dividers="${verticalDivider}"
      compact-design="${compactDesign}"
      ${responsiveDesign ? 'enable-responsive' : ''}
      ${noMinWidth ? 'no-min-width' : ''}
      ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
  >
          <sdds-table-toolbar table-title="Filter" enable-filtering></sdds-table-toolbar>
          <sdds-table-header>
              <sdds-header-cell column-key='truck' column-title='Truck type' ${
                column1Width ? `custom-width="${column1Width}"` : ''
              }></sdds-header-cell>
              <sdds-header-cell column-key='driver' column-title='Driver name' ${
                column2Width ? `custom-width="${column2Width}"` : ''
              }></sdds-header-cell>
              <sdds-header-cell column-key='country' column-title='Country' ${
                column3Width ? `custom-width="${column3Width}"` : ''
              }></sdds-header-cell>
              <sdds-header-cell column-key='mileage' column-title='Mileage' text-align='right' ${
                column4Width ? `custom-width="${column4Width}"` : ''
              }></sdds-header-cell>
          </sdds-table-header>
          <sdds-table-body ${useDataProp ? `body-data='${JSON.stringify(dummyData)}'` : ''}>
            ${
              !useDataProp
                ? dummyData
                    .map(
                      (row) =>
                        `<sdds-table-body-row>
                        ${Object.entries(row)
                          .map(
                            (cell) =>
                              `<sdds-body-cell cell-key="${cell[0]}" cell-value="${cell[1]}"></sdds-body-cell>`,
                          )
                          .join(' ')}
                      </sdds-table-body-row>`,
                    )
                    .join(' ')
                : ''
            }
          </sdds-table-body>
  </sdds-table>
  
  <script>
    document.addEventListener('sddsFilterChange', (event) => {
      console.log(event)
    })
  </script>`);

export const Filtering = FilteringTemplate.bind({});