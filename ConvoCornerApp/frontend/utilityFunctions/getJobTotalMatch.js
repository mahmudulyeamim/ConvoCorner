export async function getJobTotalMatch(jobId, setTotalMatch, setTotalInterested) {
    // fetch api call to get job total match
    const url = `${process.env.NEXT_PUBLIC_MATCH_API}/match/kpiperjob/${jobId}`
    let recruiterToken = JSON.parse(localStorage.getItem('recruiterToken'));
    const response = await fetch(url, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${recruiterToken.app_token}`,
        },
    });
    const res = await response.json();
    console.log(res);
    setTotalInterested(res.liked)
    setTotalMatch(res.match_count)
}