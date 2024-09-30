import PropTypes from "prop-types";

const ListTable = ({ headers, competitorData, loading }) => {
  return (
    <div className="relative overflow-x-auto font-medium bg-white">
      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead>
            <tr>
              {headers?.map((item) => (
                <th
                  key={item.key}
                  scope="col"
                  className="px-1 py-3 text-xs text-black bg-white border-b-2 md:px-6 text-nowrap md:text-sm"
                >
                  {item.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {competitorData?.length > 0 ? (
              competitorData.map((row) => (
                <tr
                  key={row.id}
                  className="text-xs bg-white border-b md:text-sm font-montserrat hover:bg-gray-100"
                >
                  {headers?.map((header) => (
                    <td
                      key={header.key}
                      className="py-4 pl-1.5 font-medium border-b-2 md:px-6"
                    >
                      <div className="font-medium text-black">
                        {header.render ? header.render(row) : row[header.key]}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers?.length} className="py-3 text-center">
                  No items found...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Adding PropTypes
ListTable.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      render: PropTypes.func,
    })
  ).isRequired,
  competitorData: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool, // New loading prop
};

ListTable.defaultProps = {
  loading: false, // Default value for loading
};

export default ListTable;
