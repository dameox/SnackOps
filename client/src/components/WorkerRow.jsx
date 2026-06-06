function WorkerRow({worker}) {
    return(
        <tr className='machine-row'>
            <td className='machine-row-name'>{worker.name}</td>
            <td className='machine-row-address'>{worker.email}</td>
        </tr>
    );
}

export default WorkerRow