var protocol_port = '';
var totalBytes = 0;
var hostname;

// Flow refers to a conversation between two endpoints over a protocol such as TCP, UDP or ICMP.
// we're only interested in TCP or UDP traffic
if ((Flow.ipproto.toString() == 'TCP') || (Flow.ipproto.toString() == 'UDP')) {
    //protocol_port_client = Flow.ipproto.toString() + '|' +  Flow.client.port.toString() + '|' + Flow.server.port.toString();
    //protocol_port_server = Flow.ipproto.toString() + '|' +  Flow.server.port.toString() + '|' + Flow.client.port.toString();
    protocol_port = Flow.ipproto.toString() + '|' + Flow.server.port.toString();
    //debug(protocol_port)
} else {
    return;
}

// let's check the total amount of incoming and outgoing traffic for this flow.
totalBytes = Flow.client.bytes + Flow.server.bytes;
//debug(totalBytes);

// now add our custom metric to this client device if a trigger has been assigned
if (Flow.client.device.hasTrigger) {
    if (Flow.server.ipaddr.isRFC1918) {
        debug("RFC1918 connection to: " + Flow.server.ipaddr)
        Flow.client.device.metricAddCount("client_app_metrics", totalBytes)
        Flow.client.device.metricAddDetailCount("client_app_metrics_src_dst_proto_port", Flow.client.ipaddr.toString() + "|" + Flow.server.ipaddr.toString() + "|" + protocol_port, totalBytes)
    }
    // special metric for external connections, we don't care about ipv6 for now
    if (!(Flow.server.ipaddr.isRFC1918 || Flow.server.ipaddr.isMulticast || Flow.server.ipaddr.isV6)) {
        debug("found external connection: " + Flow.server.ipaddr);
        Flow.client.device.metricAddDetailCount("client_app_metrics_src_extdst_proto_port", Flow.client.ipaddr.toString() + "|" + Flow.server.ipaddr.toString() + "|" + protocol_port, totalBytes);
    }
}

// if our selected device is a server
if (Flow.server.device.hasTrigger) {
    //debug("checking device: " + Flow.server.ipaddr.toString())
    Flow.server.device.metricAddCount("server_app_metrics", totalBytes)
    //Flow.server.device.metricAddDetailCount("server_app_metrics_src_dst_proto_port", Flow.client.ipaddr.toString() + "|" + Flow.server.ipaddr.toString() + "|" + protocol_port_server, totalBytes)
    Flow.server.device.metricAddDetailCount("server_app_metrics_src_dst_proto_port", Flow.client.ipaddr.toString() + "|" + Flow.server.ipaddr.toString() + "|" + protocol_port, totalBytes)
}