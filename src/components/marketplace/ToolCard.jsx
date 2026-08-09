import { Link } from "react-router-dom";
import {
  BadgeCheck,
  MapPin,
  Layers,
  Factory,
  ArrowRight,
} from "lucide-react";

export default function ToolCard() {
  return (
    <div className="tool-card">

      <div className="tool-image">
        <img
          src="https://placehold.co/600x350/e8eef6/0E2340?text=Injection+Mould"
          alt="Injection Mould"
        />
      </div>

      <div className="tool-body">

        <span className="tool-id">
          Tool ID : TK-10248
        </span>

        <h3>Automotive Injection Mould</h3>

        <div className="company">

          <Factory size={16} />

          ABC Tool Room Pvt Ltd

        </div>

        <div className="verified">

          <BadgeCheck size={16} />

          Verified Business

        </div>

        <div className="tool-specs">

          <div>

            <Layers size={16} />

            4 Cavity

          </div>

          <div>

            650 Ton

          </div>

          <div>

            Tool Life
            <strong>500K Shots</strong>

          </div>

        </div>

        <div className="tool-location">

          <MapPin size={16} />

          Pune, Maharashtra

        </div>

        <div className="tool-footer">

          <span className="available">

            Available

          </span>

          <Link to="/tool/1">
          <button>

            View Details

            <ArrowRight size={16} />

          </button>
          
          </Link>

        </div>

      </div>

    </div>
  );
}   