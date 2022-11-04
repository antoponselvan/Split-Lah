import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {selectedGroupActions} from '../store/selectedGroupSlice'

const CardUserGroupSummary = () => {
  const navigate = useNavigate()
  const userGroups = useSelector((state)=>state.userSummary.groupList)
  const loggedInUser = useSelector((state)=>state.user)
  const dispatch = useDispatch()

  const totalGroups = userGroups?.length;

  const handleAddGroupClick = () => {navigate('/group/register')}

  const handleGroupClick = (groupId) => {
    return () => {
      fetch('/api/groups/details',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({groupId})
      }).then((res)=>{
        console.log(res)
        if (res.status !== 200){
          throw new Error({msg:"Some comm error"})
        }
        return res.json()
      }).then ((data)=>{
        // console.log(data)
        dispatch(selectedGroupActions.updateSelectedGroup({groupId, name:data.name, description:data.description, userList:data.userDetails}))
        navigate('/detailedpages/group/details')
      }).catch((error)=>{
        console.log(error)
      })
      }
  }

  return (
    <div>
      <Card variant="light" style={{ width: "30rem" }}>
        <Card.Header>Groups – {totalGroups}</Card.Header>
        <Card.Body>
          <Card.Text>
            <ul>
              {userGroups.map((group) => (
                <li onClick={handleGroupClick(group._id)} key={group.id}>{group.name}</li>
              ))}
              <li onClick={handleAddGroupClick}>Create a group</li>
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardUserGroupSummary;