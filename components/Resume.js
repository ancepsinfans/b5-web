import Summary from './Summary'
import Domain from './Domain'

const Resume = ({ data, width }) => (
  <div>
    {data && <Summary data={data} yDomainRange={[24, 60]} chartWidth={width} />}
    {data && data.map((domain, index) => <Domain data={domain} key={index} chartWidth={width} />)}
  </div>
)

export default Resume
