import { useRepo } from '../context/RepoContext';

function Table() {
    const { repoData } = useRepo();

    if (repoData.length === 0) {
        return <div>No data</div>
    }
    return (
        <div>table</div>
    )
}

export default Table
