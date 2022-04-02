import Summary from './Summary'
import Domain from './Domain'

const Resume = ({ data, width }) => (
  <div>
    {data && <Summary data={data} yDomainRange={[24, 60]} chartWidth={width} />}
    <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLScebfoxNRM3EwxUG2m2PQT-tXRQLs8g8FysSHTQbWzDrJ_wdA/viewform?embedded=true"
        width="700" height="500" frameBorder="0" marginHeight="0" marginWidth="0">Loading…
    </iframe>
    {data && data.map((domain, index) => <Domain data={domain} key={index} chartWidth={width} />)}
  </div>
)

export default Resume
