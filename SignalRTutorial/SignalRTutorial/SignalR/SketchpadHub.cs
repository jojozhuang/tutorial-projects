using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRTutorial
{
    public class SketchpadHub : Hub
    {
        public void JoinGroup(string groupName)
        {
            Groups.Add(Context.ConnectionId, groupName);
        }
        //public void SendDraw(string drawObject, string sessionId, string groupName, string name)
        //{
        //    Clients.Group(groupName).HandleDraw(drawObject, sessionId, name);
        //}

        public void SendDraw(string groupName, string x, string y, string drawtype)
        {
            //Clients.Group(groupName).broadcastDraw(x, y, drawtype);
            // exclude self
            Clients.Others.broadcastDraw(x, y, drawtype);
        }
    }
}